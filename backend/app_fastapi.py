from fastapi import FastAPI, HTTPException, UploadFile, File, Form
from backend.review import ReviewRequest, generate_review
from backend.self_review import SelfReviewRequest, generate_self_review
from backend.llm import GroqLLM
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/generate_review")
async def api_generate_review(request: ReviewRequest):
    try:
        review = generate_review(**request.model_dump())
        return {"review": review}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/generate_self_review")
async def api_generate_self_review(request: SelfReviewRequest):
    try:
        self_review = generate_self_review(**request.model_dump())
        return {"self_review": self_review}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/transcribe_audio")
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

@app.get("/")
async def root():
    return {"message": "Welcome to the Performance Review API"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)

# To run this server, use the following command in the terminal:
# uvicorn app_fastapi:app --host 0.0.0.0 --port 8000