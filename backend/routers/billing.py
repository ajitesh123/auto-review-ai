from fastapi import APIRouter, Depends, HTTPException, Request, Response, status
from pydantic import BaseModel
from datetime import datetime
from loguru import logger
import stripe

from backend.config import Config
from backend.middleware.check_auth import get_current_user
from backend.db.operations import update_user_subscription, get_user_by_id
from backend.schemas.billing import CheckoutSessionRequest

router = APIRouter()

# Set up Stripe secret key
stripe.api_key = Config.Stripe.SECRET_KEY

@router.post("/create_checkout_session")
async def create_checkout_session(request: CheckoutSessionRequest, current_user: dict = Depends(get_current_user)):
    try:
        logger.info(f"Creating checkout session with request: {request}")
        logger.info(f"User details: {current_user}")
        
        # Validate the price_id
        if not request.price_id.startswith('price_'):
            raise ValueError("Invalid price ID format")

        # Create a new checkout session
        session = stripe.checkout.Session.create(
            customer_email=current_user.get("email"),
            payment_method_types=['card'],
            mode='subscription',
            line_items=[{
                'price': request.price_id,
                'quantity': 1,
            }],
            success_url=request.success_url,
            cancel_url=request.cancel_url,
            metadata={
                'customer_name': f"{current_user.get('given_name', '')} {current_user.get('family_name', '')}".strip(),
                'customer_email': current_user.get("email", ""),
                'customer_id': current_user["id"],
                'product_id': request.price_id
            },
        )
        
        return {"session_id": session.id, "url": session.url}
    except Exception as e:
        logger.error(f"Error creating checkout session: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(e)
        )

# Store processed event IDs (you might want to use Redis or a database for production)
processed_events = set()

@router.post("/webhook")
async def stripe_webhook(request: Request):
    """Handle Stripe webhook events"""
    try:
        # Get the webhook data
        payload = await request.body()
        sig_header = request.headers.get('stripe-signature')
        
        # Verify webhook signature
        try:
            event = stripe.Webhook.construct_event(
                payload, sig_header, Config.Stripe.WEBHOOK_SECRET
            )
        except ValueError as e:
            logger.error(f"Invalid payload: {e}")
            return Response(status_code=400)
        except stripe.error.SignatureVerificationError as e:
            logger.error(f"Invalid signature: {e}")
            return Response(status_code=400)

        # Check for duplicate events
        event_id = event['id']
        if event_id in processed_events:
            logger.info(f"Skipping duplicate event: {event_id}")
            return Response(status_code=200)
        
        event_type = event['type']
        logger.info(f"Received Stripe event: {event_type} (ID: {event_id})")

        # Mapping of product IDs to tiers
        PRODUCT_TIER_MAP = {
            Config.Stripe.STARTER_PRODUCT_ID: "starter",
            Config.Stripe.PRO_PRODUCT_ID: "pro"
        }

        # Only process specific events we care about
        if event_type == 'checkout.session.completed':
            session = event['data']['object']
            customer_id = session.get('metadata', {}).get('customer_id')
            
            if not customer_id:
                logger.error("No customer_id found in session metadata")
                return Response(status_code=400)
            
            # Determine tier based on product ID
            line_items = stripe.checkout.Session.retrieve(
                session['id'], 
                expand=['line_items']
            ).line_items.data
            
            product_id = line_items[0].price.product if line_items else None
            tier = PRODUCT_TIER_MAP.get(product_id, 'free')
            
            subscription_data = {
                "tier": tier, 
                "start_date": datetime.utcnow(),
                "end_date": None,
                "stripe_customer_id": session['customer'],
                "stripe_subscription_id": session.get('subscription')
            }
            
            await update_user_subscription(customer_id, subscription_data)
            logger.info(f"Successfully updated subscription for user {customer_id}")
        
        elif event_type == 'customer.subscription.deleted':
            # Handle subscription cancellation
            subscription = event['data']['object']
            customer_id = subscription.get('metadata', {}).get('customer_id')
            if customer_id:
                subscription_data = {
                    "tier": "free",
                    "start_date": None,
                    "end_date": datetime.utcnow(),
                    "stripe_customer_id": None
                }
                await update_user_subscription(customer_id, subscription_data)
                logger.info(f"Subscription cancelled for user {customer_id}")
        
        # Add event to processed set
        processed_events.add(event_id)
        
        return Response(status_code=200)
    
    except Exception as e:
        logger.error(f"Error processing webhook: {e}")
        return Response(status_code=500)

@router.get("/credits")
async def get_credits(current_user: dict = Depends(get_current_user)):
    """Get user's credit information"""
    try:
        user = await get_user_by_id(current_user["id"])
        return {
            "remaining_credits": user.remaining_credits,
            "total_purchased": user.total_credits_purchased,
            "total_used": user.api_calls_count
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))