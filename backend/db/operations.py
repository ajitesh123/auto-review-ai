from datetime import datetime
from typing import Any
from backend.db.connection import get_database
from backend.models.user import User, Review
from bson import ObjectId
from loguru import logger

# User operations -->
async def create_user(user: User):
    """Create a new user in the database."""
    db = await get_database()
    user_dict = user.dict()
    result = await db.users.insert_one(user_dict)
    return user.id

async def get_user_by_email(email: str):
    """Retrieve a user by their email address."""
    db = await get_database()
    user_data = await db.users.find_one({"email": email})
    if user_data:
        # Convert ObjectId to string and remove the original ObjectId field
        user_data['id'] = str(user_data['_id'])
        del user_data['_id']
        return User(**user_data)
    return None

async def get_user_by_id(user_id: str):
    """Retrieve a user by their ID."""
    db = await get_database()
    user_data = await db.users.find_one({"id": user_id})  # Use the id field directly
    if user_data:
        return User(**user_data)
    return None

async def update_user(user: User):
    """Update an existing user's information."""
    db = await get_database()
    await db.users.update_one(
        {"_id": ObjectId(user.id)},
        {"$set": user.dict(exclude={"id"}, by_alias=True)}
    )

# Review operations -->
async def create_review(review: Review):
    """Create a new review in the database."""
    db = await get_database()
    review_dict = review.dict()
    review_dict['_id'] = str(ObjectId())  # Ensure _id is a string
    result = await db.reviews.insert_one(review_dict)
    return str(result.inserted_id)

async def get_reviews_by_user(user_id: str):
    """Retrieve all reviews by a specific user."""
    db = await get_database()
    cursor = db.reviews.find({"user_id": user_id})
    reviews = await cursor.to_list(length=None)
    return [Review(**review) for review in reviews]

async def update_user_subscription(user_id: str, subscription_data: dict):
    """Update user's subscription details"""
    try:
        logger.info(f"Updating user subscription for user {user_id} with data: {subscription_data}")
        db = await get_database()
        # First get the user to find their _id
        user = await db.users.find_one({"id": user_id})
        if not user:
            logger.error(f"No user found with Kinde ID {user_id}")
            raise ValueError(f"No user found with Kinde ID {user_id}")
            
        update_fields = {
            "subscription_tier": subscription_data["tier"],
            "subscription_start_date": subscription_data["start_date"],
            "subscription_end_date": subscription_data["end_date"],
            "stripe_customer_id": subscription_data.get("stripe_customer_id"),
            "stripe_subscription_id": subscription_data.get("stripe_subscription_id"),
            "is_paid": True
        }
        
        result = await db.users.update_one(
            {"_id": user["_id"]},  # Use MongoDB _id for update
            {"$set": update_fields}
        )
        return result.modified_count > 0
    except Exception as e:
        logger.error(f"Error updating user subscription: {e}")
        raise

async def increment_api_calls(user_id: str):
    """Increment the API calls counter for a user"""
    try:
        db = await get_database()
        # First get the user to find their _id
        user = await db.users.find_one({"id": user_id})
        if not user:
            logger.error(f"No user found with Kinde ID {user_id}")
            raise ValueError(f"No user found with Kinde ID {user_id}")

        result = await db.users.update_one(
            {"_id": user["_id"]},  # Use MongoDB _id for update
            {
                "$inc": {"api_calls_count": 1},
                "$set": {"last_api_call": datetime.utcnow()}
            }
        )
        return result.modified_count > 0
    except Exception as e:
        logger.error(f"Error incrementing API calls: {e}")
        raise