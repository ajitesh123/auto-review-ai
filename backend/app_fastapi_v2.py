# Standard library imports
from datetime import datetime, timedelta
from typing import List, Optional

# Third-party imports
from fastapi import FastAPI, HTTPException, Request, UploadFile, File, Form, Depends, status, Response
from fastapi.security import OAuth2AuthorizationCodeBearer
from fastapi.responses import RedirectResponse
from urllib.parse import urlencode
from pydantic import BaseModel
from bson import ObjectId
from loguru import logger
import stripe
import hashlib

# Local application imports
from backend.llm import GroqLLM
from backend.orchestrator import generate_review, generate_self_review, transcribe_audio
from backend.config import Config
from backend.kindle_auth import kinde_client, kinde_configuration
from backend.db.operations import (
    check_and_decrement_credits,
    create_user,
    get_reviews_by_user,
    get_user_by_email,
    get_user_by_id,
    update_user,
    create_review,
    update_user_subscription
)
from backend.models.user import User, Review
from tests_backend.test_data.test_review_data import TEST_DATA_REVIEW

v2 = FastAPI()

class ReviewRequestV2(BaseModel):
    your_role: str
    candidate_role: str
    perf_question: Optional[str] = None
    your_review: str
    is_paid: bool

class SelfReviewRequestV2(BaseModel):
    text_dump: str
    questions: List[str] 
    instructions: Optional[str] = None
    is_paid: bool

# OAuth2 scheme for FastAPI
oauth2_scheme = OAuth2AuthorizationCodeBearer(
    authorizationUrl=f"{Config.Kinde.DOMAIN}/oauth2/auth",
    tokenUrl=f"{Config.Kinde.DOMAIN}/oauth2/token",
)

async def get_current_user(token: str = Depends(oauth2_scheme)):
    """Dependency to check if user is authenticated."""
    if not kinde_client.is_authenticated():
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Not authenticated",
            headers={"WWW-Authenticate": "Bearer"},
        )
    return kinde_client.get_user_details()

@v2.get("/")
async def root():
    return {"message": "Welcome to the Performance Review API v2"}

@v2.get("/ping")
async def ping():
    """Health check endpoint."""
    return {"status": "pong"}

@v2.post("/generate_review")
async def api_generate_review(request: ReviewRequestV2, current_user: dict = Depends(get_current_user)):
    try:
        # Check and decrement credits
        credits_available = await check_and_decrement_credits(current_user["id"])

        if not credits_available:
            raise HTTPException(
                status_code=403,
                detail="No credits remaining. Please purchase more credits to continue using this feature."
            )

        # review =  TEST_DATA_REVIEW #Uncomment this for running tests to avoid LLM calls
        review = generate_review(**request.model_dump())
        logger.info(f"Generated review: {review}")

        # Save the review to the database
        review_obj = Review(
            user_id=current_user["id"],
            review_type="performance",
            review_details=review
        )
        review_id = await create_review(review_obj)
        logger.info(f"Review created with ID: {review_id}")

        return {"review": review}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@v2.post("/generate_self_review")
async def api_generate_self_review(request: SelfReviewRequestV2, current_user: dict = Depends(get_current_user)):
    try:
        # Check and decrement credits
        credits_available = await check_and_decrement_credits(current_user["id"])

        if not credits_available:
            raise HTTPException(
                status_code=403,
                detail="No credits remaining. Please purchase more credits to continue using this feature."
            )
        
        self_review = generate_self_review(**request.model_dump())

        # Save the review to the database
        review_obj = Review(
            user_id=current_user["id"],
            review_type="self",
            review_details=self_review
        )
        review_id = await create_review(review_obj)
        logger.info(f"Review created with ID: {review_id}")

        return {"self_review": self_review}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@v2.get("/reviews", response_model=List[Review])
async def get_past_reviews(current_user: dict = Depends(get_current_user)):
    """Fetch all past reviews for the authenticated user."""
    try:
        reviews = await get_reviews_by_user(current_user["id"])
        return reviews
    except Exception as e:
        logger.error(f"Error fetching reviews for user {current_user['id']}: {e}")
        raise HTTPException(status_code=500, detail="Failed to fetch reviews.")

@v2.post("/transcribe_audio")
async def api_transcribe_audio(file: UploadFile = File(...), is_paid: bool = False, current_user: dict = Depends(get_current_user)):
    try:
        audio_bytes = await file.read()
        transcribed_text = transcribe_audio(is_paid, audio_bytes)
        return {"transcribed_text": transcribed_text}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@v2.get("/login")
async def login():
    login_url = kinde_client.get_login_url()
    return {"login_url": login_url}

@v2.get("/register")
async def register():
    register_url = kinde_client.get_register_url()
    return {"register_url": register_url}

@v2.get("/callback")
async def callback(code: str, state: str):
    try:
        logger.info(f"Callback called with code: {code} and state: {state}")
        kinde_client.fetch_token(authorization_response=f"{Config.Kinde.CALLBACK_URL}?code={code}&state={state}")
        
        # Access token
        logger.info(f"Access token: {kinde_configuration.access_token}")
        logger.info(f"User details: {kinde_client.get_user_details()}")
        logger.info(f"Callback called with FE url {Config.FRONTEND_BASE_URL}/login/callback")

        #user details
        user_details = kinde_client.get_user_details()
        logger.info(f"User details: {user_details}")
        
        # Check if user exists in the database, if not create a new user
        user = await get_user_by_email(user_details["email"])
        if not user:
            logger.info(f"Creating new user with email: {user_details['email']}")
            user = User(
                id=user_details["id"],  # Use the Kinde-provided ID
                email=user_details["email"],
                name=user_details.get("given_name", "") + " " + user_details.get("family_name", ""),
                is_paid=False
            )
            await create_user(user)
        else:
            logger.info(f"Existing user found with email: {user_details['email']}")

        params = {
            "token": kinde_configuration.access_token,
            "user": user_details,
            "route": "home"
        }
        query_string = urlencode(params)
        return RedirectResponse(url=f"{Config.FRONTEND_BASE_URL}/login/callback/?{query_string}")

    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Authentication failed: {str(e)}")
    
@v2.get("/dashboard")
async def dashboard(current_user: dict = Depends(get_current_user)):
    return {"message": "Dashboard", "user": current_user}

@v2.get("/logout")
async def logout():
    logout_url = kinde_client.logout(redirect_to=Config.Kinde.LOGOUT_URL)
    logger.info(f"Logout url token: {logout_url}")
    return {"logout_url": logout_url}

@v2.get("/callback-logout")
async def callback_logout():
    logger.info(f"Callback logout called ")
    return RedirectResponse(url=f"{Config.FRONTEND_BASE_URL}/logout/callback")

@v2.get("/user")
async def get_user(current_user: dict = Depends(get_current_user)):
    return current_user

@v2.get("/is_authenticated")
async def is_authenticated():
    return {"is_authenticated": kinde_client.is_authenticated()}

@v2.get("/user_details", response_model=User)
async def get_user_details(current_user: dict = Depends(get_current_user)):
    """Fetches detailed information about the authenticated user."""
    try:
        user = await get_user_by_id(current_user["id"])
        if user is None:
            # If user is not found, we'll create a new user with basic information
            new_user = User(
                id=current_user["id"],
                email=current_user.get("email", ""),
                name=f"{current_user.get('given_name', '')} {current_user.get('family_name', '')}".strip(),
                is_paid=False
            )
            await create_user(new_user)
            user = new_user
        return user
    except Exception as e:
        logger.error(f"Error fetching or creating user details for user {current_user['id']}: {e}")
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Failed to fetch or create user details.")


# Set up your Stripe secret key
stripe.api_key = Config.Stripe.SECRET_KEY

class CheckoutSessionRequest(BaseModel):
    price_id: str
    success_url: str
    cancel_url: str

@v2.post("/stripe/create_checkout_session")
async def create_checkout_session(request: CheckoutSessionRequest, current_user: dict = Depends(get_current_user)):
    try:
        logger.info(f"Creating checkout session with request: {request}")
        logger.info(f"User details: {current_user}")
        
        # Validate the price_id
        if not request.price_id.startswith('price_'):
            raise ValueError("Invalid price ID format")

        # Create a new checkout session
        session = stripe.checkout.Session.create(
            customer_email=current_user.get("email"),  # Pre-fill customer email
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
    except stripe.error.StripeError as e:
        logger.error(f"Stripe error: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Stripe error: {str(e)}"
        )
    except ValueError as e:
        logger.error(f"Validation error: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )
    except Exception as e:
        logger.error(f"Unexpected error: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="An unexpected error occurred"
        )
# Store processed event IDs (you might want to use Redis or a database for production)
processed_events = set()

@v2.post("/webhook/stripe")
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
            'prod_R7V2wtWtiVBcyv': "starter",
            'prod_R717pPAun9k0s9': "pro"
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

@v2.get("/credits")
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

"""
Some other useful settings from Kindle Dashboard:
- To use own signup/login screen: go to "Details" and select "user your own signup/login screen"
- Make sure prod callback urls and logout urls are set in Details
- To not use email and code: we can switch off from "Authentication" tab


To test the API:
1. Test the root endpoint:
curl http://localhost:8003/v2/
{"message":"Welcome to the Performance Review API v2"}

2. curl http://localhost:8003/v2/ping
{"status":"pong"}

3. curl http://localhost:8003/v2/login
{"login_url":"https://archieai.kinde.com/oauth2/auth?response_type=code&client_id=9d67b8780d5e452d8340797f2d2ea8c3&redirect_uri=http%3A%2F%2Flocalhost%3A8003%2Fcallback&scope=openid+profile+email+offline&state=MVEKXbieIS5lOXyU3BliQq3Q776DJU"}%
"""