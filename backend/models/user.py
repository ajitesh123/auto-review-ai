from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime
from bson import ObjectId

class User(BaseModel):
    id: str
    email: str
    name: str
    is_paid: bool = False
    stripe_customer_id: Optional[str] = None
    stripe_subscription_id: Optional[str] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        allow_population_by_field_name = True

class Review(BaseModel):
    user_id: str
    review_type: str
    review_details: list[dict[str, str]]
    created_at: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        arbitrary_types_allowed = True