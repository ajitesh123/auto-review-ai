from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.app_fastapi_v1 import v1
from backend.app_fastapi_v2 import v2
import logfire

app = FastAPI()

logfire.configure()
logfire.instrument_fastapi(app)


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.mount("/v1", v1)
app.mount("/v2", v2)

@app.get("/")
async def root():
    return {"message": "Welcome to the Performance Review API"}

# To run this server with automatic reload on save, use the following command in the terminal:
# uvicorn backend.app_fastapi:app --port 8003 --reload