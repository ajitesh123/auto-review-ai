from typing import Any
from backend.db.connection import get_database
from backend.models.user import User, Review
from bson import ObjectId

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