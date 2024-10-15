from motor.motor_asyncio import AsyncIOMotorClient
from backend.config import Config

client = AsyncIOMotorClient(Config.MongoDB.URL)
db = client.performance_review_db

async def get_database():
    return db
