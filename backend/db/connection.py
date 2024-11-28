"""
This module establishes a connection to the MongoDB database using Motor,
an asynchronous MongoDB driver for Python.
"""

from motor.motor_asyncio import AsyncIOMotorClient
from backend.core.config import Config

# Establish a connection to the MongoDB server
client = AsyncIOMotorClient(Config.MongoDB.URL)

# Get a reference to the performance_review_db database
db = client.performance_review_db

async def get_database():
    """
    Asynchronous function to retrieve the database instance.

    Returns:
        AsyncIOMotorDatabase: The MongoDB database instance for performance reviews.
    """
    return db