from typing import Any
from backend.db.connection import get_database
from backend.models.user import User, Review
from bson import ObjectId

async def create_user(user: User):
    db = await get_database()
    user_dict = user.dict()
    result = await db.users.insert_one(user_dict)
    return user.id

async def get_user_by_email(email: str):
    db = await get_database()
    user_data = await db.users.find_one({"email": email})
    if user_data:
           user_data['id'] = str(user_data['_id'])  # Convert ObjectId to string
           del user_data['_id']  # Remove the original ObjectId field
           return User(**user_data)
    return None

async def get_user_by_id(user_id: str):
    db = await get_database()
    user_data = await db.users.find_one({"id": user_id})  # Use the id field directly
    if user_data:
        return User(**user_data)
    return None

async def update_user(user: User):
    db = await get_database()
    await db.users.update_one(
        {"_id": ObjectId(user.id)},
        {"$set": user.dict(exclude={"id"}, by_alias=True)}
    )

async def create_review(review: Review):
    db = await get_database()
    review_dict = review.dict()
    review_dict['_id'] = str(ObjectId())  # Ensure _id is a string
    result = await db.reviews.insert_one(review_dict)
    return str(result.inserted_id)

async def get_reviews_by_user(user_id: str):
    db = await get_database()
    cursor = db.reviews.find({"user_id": user_id})
    reviews = await cursor.to_list(length=None)
    return [Review(**review) for review in reviews]