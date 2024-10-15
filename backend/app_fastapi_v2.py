# Standard library imports
from typing import List, Optional

# Third-party imports
from fastapi import FastAPI, HTTPException, UploadFile, File, Form, Depends, status, Response
from fastapi.security import OAuth2AuthorizationCodeBearer
from fastapi.responses import RedirectResponse
from urllib.parse import urlencode
from pydantic import BaseModel
from bson import ObjectId
from loguru import logger

# Local application imports
from backend.llm import GroqLLM
from backend.orchestrator import generate_review, generate_self_review, transcribe_audio
from backend.config import Config
from backend.kindle_auth import kinde_client, kinde_configuration
from backend.db.operations import (
    create_user,
    get_reviews_by_user,
    get_user_by_email,
    get_user_by_id,
    update_user,
    create_review
)
from backend.models.user import User, Review
from backend.tests.test_data.test_review_data import TEST_DATA_REVIEW

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

# OAuth2 scheme for FastAPI
oauth2_scheme = OAuth2AuthorizationCodeBearer(
    authorizationUrl=f"{Config.Kinde.DOMAIN}/oauth2/auth",
    tokenUrl=f"{Config.Kinde.DOMAIN}/oauth2/token",
)

async def get_current_user(token: str = Depends(oauth2_scheme)):
    """Dependency to check if user is authenticated."""
    if not kinde_client.is_authenticated():
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Not authenticated",
            headers={"WWW-Authenticate": "Bearer"},
        )
    return kinde_client.get_user_details()

@v2.get("/")
async def root():
    return {"message": "Welcome to the Performance Review API v2"}

@v2.get("/ping")
async def ping():
    """Health check endpoint."""
    return {"status": "pong"}

@v2.post("/generate_review")
async def api_generate_review(request: ReviewRequestV2, current_user: dict = Depends(get_current_user)):
    try:
        # review =  TEST_DATA_REVIEW #Uncomment this for running tests to avoid LLM calls
        review = generate_review(**request.model_dump())
        logger.info(f"Generated review: {review}")

        # Save the review to the database
        review_obj = Review(
            user_id=current_user["id"],
            review_type="performance",
            review_details=review
        )
        review_id = await create_review(review_obj)
        logger.info(f"Review created with ID: {review_id}")

        return {"review": review}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@v2.post("/generate_self_review")
async def api_generate_self_review(request: SelfReviewRequestV2, current_user: dict = Depends(get_current_user)):
    try:
        self_review = generate_self_review(**request.model_dump())

        # Save the review to the database
        review_obj = Review(
            user_id=current_user["id"],
            review_type="self",
            review_details=self_review
        )
        review_id = await create_review(review_obj)
        logger.info(f"Review created with ID: {review_id}")

        return {"self_review": self_review}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@v2.get("/reviews", response_model=List[Review])
async def get_past_reviews(current_user: dict = Depends(get_current_user)):
    """Fetch all past reviews for the authenticated user."""
    try:
        reviews = await get_reviews_by_user(current_user["id"])
        return reviews
    except Exception as e:
        logger.error(f"Error fetching reviews for user {current_user['id']}: {e}")
        raise HTTPException(status_code=500, detail="Failed to fetch reviews.")

@v2.post("/transcribe_audio")
async def api_transcribe_audio(file: UploadFile = File(...), is_paid: bool = False, current_user: dict = Depends(get_current_user)):
    try:
        audio_bytes = await file.read()
        transcribed_text = transcribe_audio(is_paid, audio_bytes)
        return {"transcribed_text": transcribed_text}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@v2.get("/login")
async def login():
    login_url = kinde_client.get_login_url()
    return {"login_url": login_url}

@v2.get("/register")
async def register():
    register_url = kinde_client.get_register_url()
    return {"register_url": register_url}

@v2.get("/callback")
async def callback(code: str, state: str):
    try:
        logger.info(f"Callback called with code: {code} and state: {state}")
        kinde_client.fetch_token(authorization_response=f"{Config.Kinde.CALLBACK_URL}?code={code}&state={state}")
        
        # Access token
        logger.info(f"Access token: {kinde_configuration.access_token}")
        logger.info(f"User details: {kinde_client.get_user_details()}")
        logger.info(f"Callback called with FE url {Config.FRONTEND_BASE_URL}/login/callback")

        #user details
        user_details = kinde_client.get_user_details()
        logger.info(f"User details: {user_details}")
        
        # Check if user exists in the database, if not create a new user
        user = await get_user_by_email(user_details["email"])
        if not user:
            logger.info(f"Creating new user with email: {user_details['email']}")
            user = User(
                id=user_details["id"],  # Use the Kinde-provided ID
                email=user_details["email"],
                name=user_details.get("given_name", "") + " " + user_details.get("family_name", ""),
                is_paid=False
            )
            await create_user(user)
        else:
            logger.info(f"Existing user found with email: {user_details['email']}")

        params = {
            "token": kinde_configuration.access_token,
            "user": user_details,
            "route": "home"
        }
        query_string = urlencode(params)
        return RedirectResponse(url=f"{Config.FRONTEND_BASE_URL}/login/callback/?{query_string}")

    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Authentication failed: {str(e)}")
    
@v2.get("/dashboard")
async def dashboard(current_user: dict = Depends(get_current_user)):
    return {"message": "Dashboard", "user": current_user}

@v2.get("/logout")
async def logout():
    logout_url = kinde_client.logout(redirect_to=Config.Kinde.LOGOUT_URL)
    logger.info(f"Logout url token: {logout_url}")
    return {"logout_url": logout_url}

@v2.get("/callback-logout")
async def callback_logout():
    logger.info(f"Callback logout called ")
    return RedirectResponse(url=f"{Config.FRONTEND_BASE_URL}/logout/callback")

@v2.get("/user")
async def get_user(current_user: dict = Depends(get_current_user)):
    return current_user

@v2.get("/is_authenticated")
async def is_authenticated():
    return {"is_authenticated": kinde_client.is_authenticated()}

@v2.get("/user_details", response_model=User)
async def get_user_details(current_user: dict = Depends(get_current_user)):
    """Fetches detailed information about the authenticated user."""
    try:
        user = await get_user_by_id(current_user["id"])
        if user is None:
            # If user is not found, we'll create a new user with basic information
            new_user = User(
                id=current_user["id"],
                email=current_user.get("email", ""),
                name=f"{current_user.get('given_name', '')} {current_user.get('family_name', '')}".strip(),
                is_paid=False
            )
            await create_user(new_user)
            user = new_user
        return user
    except Exception as e:
        logger.error(f"Error fetching or creating user details for user {current_user['id']}: {e}")
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Failed to fetch or create user details.")

"""
Some other useful settings from Kindle Dashboard:
- To use own signup/login screen: go to "Details" and select "user your own signup/login screen"
- Make sure prod callback urls and logout urls are set in Details
- To not use email and code: we can switch off from "Authentication" tab

TODO: 
- Integerate with Supabase to store # of use of API per users and whether paid or not
- Figure out what API to called to put user details from Kindle to Supabase
- Integeration with Stripe - should we handle in backend or frontend?


To test the API:
1. Test the root endpoint:
curl http://localhost:8003/v2/
{"message":"Welcome to the Performance Review API v2"}

2. curl http://localhost:8003/v2/ping
{"status":"pong"}

3. curl http://localhost:8003/v2/login
{"login_url":"https://archieai.kinde.com/oauth2/auth?response_type=code&client_id=9d67b8780d5e452d8340797f2d2ea8c3&redirect_uri=http%3A%2F%2Flocalhost%3A8003%2Fcallback&scope=openid+profile+email+offline&state=MVEKXbieIS5lOXyU3BliQq3Q776DJU"}%
"""