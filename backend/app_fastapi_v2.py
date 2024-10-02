from fastapi import FastAPI, HTTPException, UploadFile, File, Form
from backend.review import ReviewRequest, generate_review
from backend.self_review import SelfReviewRequest, generate_self_review
from backend.llm import GroqLLM

v2 = FastAPI()

@v2.get("/ping")
async def ping():
    return {"status": "pong"}

@v2.post("/generate_review")
async def api_generate_review(request: ReviewRequest):
    try:
        review = generate_review(**request.model_dump())
        return {"review": review}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@v2.post("/generate_self_review")
async def api_generate_self_review(request: SelfReviewRequest):
    try:
        self_review = generate_self_review(**request.model_dump())
        return {"self_review": self_review}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@v2.post("/transcribe_audio")
async def transcribe_audio(file: UploadFile = File(...), groq_api_key: str = Form(...)):
    print(f"Received groq_api_key: {groq_api_key}")
    print(f"Received file: {file.filename}")
    
    if not groq_api_key:
        raise HTTPException(status_code=400, detail="Groq API key is required for transcription.")
    
    try:
        audio_bytes = await file.read()
        groq_llm = GroqLLM(api_key=groq_api_key)
        transcribed_text = groq_llm.transcribe_audio(audio_bytes)
        return {"transcribed_text": transcribed_text}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@v2.get("/")
async def root():
    return {"message": "Welcome to the Performance Review API v2"}