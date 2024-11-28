import asyncio
import datetime
import os
import sys
import pytest
from unittest.mock import patch
from motor.motor_asyncio import AsyncIOMotorClient
from bson import ObjectId
from backend.core.logger import logger

project_root = os.getcwd()
sys.path.append(project_root)

from backend.models.user import User, Review
from backend.db.operations import (
    create_user, get_user_by_email, get_user_by_id, update_user,
    create_review, get_reviews_by_user
)
from backend.db.connection import get_database

TEST_DB_NAME = "test_db"

# Fixtures -->

@pytest.fixture(scope="module")
def event_loop():
    """Fixture to create and provide an event loop for async tests."""
    loop = asyncio.get_event_loop_policy().new_event_loop()
    yield loop
    loop.close()

@pytest.fixture(scope="module")
async def test_db():
    """Fixture to set up and tear down a test database."""
    client = AsyncIOMotorClient(os.environ.get("MONGODB_URL"))
    db = client[TEST_DB_NAME]
    
    with patch("backend.db.connection.get_database", return_value=db):
        yield db
    
    await client.drop_database(TEST_DB_NAME)
    client.close()

# User operation tests -->

@pytest.mark.asyncio
async def test_create_user(test_db):
    """Test creating a new user in the database."""
    user = User(id="test_id", email="test@example.com", name="Test User")
    result = await create_user(user)
    assert result == "test_id"

@pytest.mark.asyncio
async def test_get_user_by_email(test_db):
    """Test retrieving a user by their email address."""
    retrieved_user = await get_user_by_email("ajiteshleo12@gmail.com")
    assert retrieved_user is not None
    assert retrieved_user.id == "670ed55f80d4d7e80b9ab137"
    assert retrieved_user.email == "ajiteshleo12@gmail.com"
    assert retrieved_user.name == "Ajitesh Abhishek"

@pytest.mark.asyncio
async def test_get_user_by_id(test_db):
    """Test retrieving a user by their ID."""
    retrieved_user = await get_user_by_id("kp_b5bd327bdd8e42869033993b865870b8")
    assert retrieved_user is not None
    assert retrieved_user.email == "ajiteshleo12@gmail.com"
    assert retrieved_user.name == "Ajitesh Abhishek"

@pytest.mark.asyncio
async def test_create_review(test_db):
    """Test creating a new review in the database."""
    review = Review(
        user_id="test_user_id",
        review_type="performance",
        review_details=[
            {
                "role": "Software Engineer",
                "feedback": "Great performance this quarter."
            }
        ]
    )
    result = await create_review(review)
    logger.info(result)
    assert result is not None
    assert isinstance(result, str)

    # Verify the review was created
    created_reviews = await get_reviews_by_user("test_user_id")
    logger.info(created_reviews)
    assert len(created_reviews) > 0
    latest_review = created_reviews[-1]
    assert isinstance(latest_review, Review)
    assert latest_review.user_id == "test_user_id"
    assert latest_review.review_type == "performance"
    assert len(latest_review.review_details) == 1
    assert latest_review.review_details[0]["role"] == "Software Engineer"
    assert latest_review.review_details[0]["feedback"] == "Great performance this quarter."
    assert isinstance(latest_review.created_at, datetime.datetime)
    


# Add more tests for other endpoints and database operations as needed