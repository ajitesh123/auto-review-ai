
from pydantic import BaseModel


class CheckoutSessionRequest(BaseModel):
    price_id: str
    success_url: str
    cancel_url: str