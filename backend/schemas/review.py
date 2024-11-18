from pydantic import BaseModel
from typing import Optional, List


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