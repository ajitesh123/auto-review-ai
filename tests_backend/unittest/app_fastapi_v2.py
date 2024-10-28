"""
This is a pytest test file for our FastAPI application. 

🎯 What is pytest?
- Pytest is a testing framework for Python
- It helps us write and run tests to make sure our code works correctly
- Tests in pytest are just Python functions that start with 'test_'

🔑 Key pytest concepts used here:
1. Fixtures: Reusable setup code (marked with @pytest.fixture)
2. Mocking: Creating fake versions of complex parts (using unittest.mock)
3. Assertions: Checking if things work as expected (using assert statements)
"""

import pytest
from fastapi.testclient import TestClient
from unittest.mock import patch, MagicMock
from backend.app_fastapi_v2 import v2
from backend.models.user import Review
from backend.review import generate_review

# Test client lets us make fake HTTP requests to our API
client = TestClient(v2)

# Mock data is fake data we use for testing
MOCK_USER = {
    "id": "test_user_id",
    "email": "test@example.com",
    "name": "Test User"
}

# Mock review request data
MOCK_REVIEW_REQUEST = {
    "your_role": "Engineering Manager",
    "candidate_role": "Software Engineer",
    "perf_question": "How did they perform?",
    "your_review": "Great performance in coding and teamwork. They are a great team player and always willing to help others.",
    "is_paid": False
}

@pytest.fixture(scope="module")
def mock_current_user():
    """
    🔧 This is a pytest fixture - think of it as a tool we can reuse in our tests
    
    What it does:
    - Creates a fake user that we can use in our tests
    - The scope="module" means this same user is reused for all tests in this file
    
    How to use it:
    - Add mock_current_user as a parameter to any test that needs a user
    - Pytest will automatically pass in this fake user data
    """
    return MOCK_USER

@pytest.fixture(scope="module")
def mock_create_review():
    """
    🔧 This fixture shows how to mock (fake) a database operation
    
    What it does:
    - Uses patch to replace the real database function with a fake one
    - Returns "mock_review_id" whenever the function is called
    
    Why we mock:
    - We don't want to use a real database during testing
    - Tests should be fast and not depend on external services
    """
    with patch('backend.app_fastapi_v2.create_review') as mock:
        mock.return_value = "mock_review_id"
        yield mock # yield is like return but for fixtures

@pytest.fixture(scope="module")
def mock_oauth_token():
    """Fixture to mock OAuth token validation"""
    return "mock_token"

@pytest.fixture(scope="module")
def mock_kinde_client():
    """
    🎯 Example of Correct Patching

    This fixture demonstrates proper patching of the Kinde client.
    
    Why this works:
    1. We patch 'backend.app_fastapi_v2.kinde_client' because that's where
       the code USES the client, not where it's DEFINED
    
    Example import chain:
    backend/
    ├── kindle_auth.py           # DEFINES kinde_client
    └── app_fastapi_v2.py        # IMPORTS kinde_client
    
    If we patched 'backend.kindle_auth.kinde_client', it wouldn't work because
    app_fastapi_v2.py already imported the real client before our patch!
    """
    with patch('backend.app_fastapi_v2.kinde_client') as mock:
        mock.is_authenticated.return_value = True
        mock.get_user_details.return_value = MOCK_USER
        yield mock

@pytest.mark.asyncio  # This tells pytest this is an async test
async def test_generate_review_endpoint_success(
    mock_current_user,
    mock_create_review,
    mock_oauth_token,
    mock_kinde_client
):
    """
    🧪 This test checks if our review generation API endpoint works correctly
    
    How the test works:
    1. Setup: Create a fake HTTP request with auth headers
    2. Action: Send POST request to /generate_review
    3. Checks (assertions):
       - Did we get a 200 (success) status code?
       - Is there a review in the response?
       - Was the review saved to the database?
    
    The parameters (mock_current_user, etc.) are fixtures that pytest
    automatically provides when we list them as parameters.
    """

    # Setup - prepare the request
    headers = {"Authorization": f"Bearer {mock_oauth_token}"}
    
    # Action - make the request
    response = client.post("/generate_review", json=MOCK_REVIEW_REQUEST, headers=headers)
    
    # Assertions - check if everything worked
    assert response.status_code == 200 # Check if request was successful
    assert "review" in response.json() # Check if we got a review back

    # Verify review was stored in database
    mock_create_review.assert_called_once()
    call_args = mock_create_review.call_args[0][0]
    assert isinstance(call_args, Review)
    assert call_args.user_id == mock_current_user["id"]
    assert call_args.review_type == "performance"
    assert len(call_args.review_details) > 0

@pytest.mark.asyncio
async def test_generate_review_endpoint_unauthorized(mock_kinde_client):
    """Test review generation with unauthorized user"""
    mock_kinde_client.is_authenticated.return_value = False
    headers = {"Authorization": "Bearer invalid_token"}
    response = client.post("/generate_review", json=MOCK_REVIEW_REQUEST, headers=headers)
    assert response.status_code == 401
    assert "Not authenticated" in response.json()["detail"]

def test_generate_review_function():
    """
    🧪 This test checks the review generation function directly
    
    Learning points:
    1. We can test functions directly, not just API endpoints
    2. Using 'with patch' creates a temporary mock just for this test
    3. MagicMock lets us create fake objects with any attributes we need
    
    The test verifies:
    - Function returns a list
    - List contains the expected question and answer
    """
    # Create a fake LLM (Language Model) for testing
    with patch('backend.review.create_llm_instance') as mock_create_llm:
        # Setup the fake LLM response
        mock_llm = MagicMock()
        mock_llm.generate_text.return_value = "<output><question>Q1</question><answer>A1</answer></output>"
        mock_create_llm.return_value = mock_llm
        
        # Call the function we're testing
        result = generate_review(
            your_role="Manager",
            candidate_role="Engineer",
            perf_question="How did they perform?",
            your_review="Great work",
            llm_type="openai",
            user_api_key="test_key",
            model_size="small"
        )
        
        # Check the results
        assert isinstance(result, list)  # Should return a list
        assert len(result) == 1  # Should have one item
        assert result[0]["question"] == "Q1"  # Check question
        assert result[0]["answer"] == "A1"  # Check answer

#path: tests_backend/unittest/app_fastapi_v2.py