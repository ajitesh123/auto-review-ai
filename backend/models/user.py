from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime
from bson import ObjectId

class User(BaseModel):
    """
    Represents a user in the system.

    This model includes basic user information, subscription details,
    and timestamps for creation and last update.
    """
    id: str
    email: str
    name: str
    is_paid: bool = False  # Indicates whether the user has a paid subscription
    stripe_customer_id: Optional[str] = None  # Stripe customer ID for paid users
    stripe_subscription_id: Optional[str] = None  # Stripe subscription ID for paid users
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        allow_population_by_field_name = True  # Allows setting fields by their name during model creation

class Review(BaseModel):
    """
    Represents a review submitted by a user.

    This model includes the user who submitted the review, the type of review,
    and the details of the review.
    """
    user_id: str  # ID of the user who submitted the review
    review_type: str  # Type of review (e.g., product review, service review)
    review_details: list[dict[str, str]]  # List of dictionaries containing review details
    created_at: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        arbitrary_types_allowed = True  # Allows for more flexible type checking