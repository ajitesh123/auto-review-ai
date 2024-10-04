from fastapi import FastAPI, HTTPException, UploadFile, File, Form
from pydantic import BaseModel
from typing import List, Optional
from backend.llm import GroqLLM
from backend.orchestrator import generate_review, generate_self_review, transcribe_audio

v2 = FastAPI()

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

@v2.get("/")
async def root():
    return {"message": "Welcome to the Performance Review API v2"}

@v2.get("/ping")
async def ping():
    return {"status": "pong"}

@v2.post("/generate_review")
async def api_generate_review(request: ReviewRequestV2):
    try:
        review = generate_review(**request.model_dump())
        return {"review": review}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@v2.post("/generate_self_review")
async def api_generate_self_review(request: SelfReviewRequestV2):
    try:
        self_review = generate_self_review(**request.model_dump())
        return {"self_review": self_review}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@v2.post("/transcribe_audio")
async def api_transcribe_audio(file: UploadFile = File(...), is_paid: bool = False):
    try:
        audio_bytes = await file.read()
        transcribed_text = transcribe_audio(is_paid, audio_bytes)
        return {"transcribed_text": transcribed_text}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))