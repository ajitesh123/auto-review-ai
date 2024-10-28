from loguru import logger
import json
import urllib.request
import urllib.error
import io
import os 
import sys
import requests
project_root = os.getcwd()  # Get the current working directory
sys.path.append(project_root)


# Base URL for the FastAPI server
BASE_URL = "http://localhost:8003/v2"
#BASE_URL = "https://auto-review-ai-doc-478427299327.us-west4.run.app/v2" #PROD testing

"""
Note: Don't use --reload when running tests locallt as access token will expire that way

Refresh this token everytime to run the test
TODO: Automate generation of this token

To fetch access token: 
1. Prod: curl https://auto-review-ai-doc-478427299327.us-west4.run.app/v2/login
2. Dev: curl http://localhost:8003/v2/login

"""

ACCESS_TOKEN = "eyJhbGciOiJSUzI1NiIsImtpZCI6IjM0OjFjOmM5OjVlOjJlOmNmOmE4OmYzOmI3Ojg5OjBmOmY0OjA1OjI2OjkxOjE2IiwidHlwIjoiSldUIn0.eyJhdWQiOltdLCJhenAiOiI5ZDY3Yjg3ODBkNWU0NTJkODM0MDc5N2YyZDJlYThjMyIsImV4cCI6MTczMDkwMzYwMSwiaWF0IjoxNzMwMDM5NjAxLCJpc3MiOiJodHRwczovL2FyY2hpZWFpLmtpbmRlLmNvbSIsImp0aSI6ImQyM2VkZDFmLTcwNDYtNDkwYS05MGQyLWJkM2RmNmQxOWJmNiIsIm9yZ19jb2RlIjoib3JnX2UyZWI2NzE1MzE5IiwicGVybWlzc2lvbnMiOltdLCJzY3AiOlsib3BlbmlkIiwicHJvZmlsZSIsImVtYWlsIiwib2ZmbGluZSJdLCJzdWIiOiJrcF9iNWJkMzI3YmRkOGU0Mjg2OTAzMzk5M2I4NjU4NzBiOCJ9.InoVF_maVXaIVT7Z6zcIsiGh83biZ6DVKGHY2JC2Ii1FQIlkpfPRwXfVodTDCNIePzhRyFUwUA0KIF0TmheTaGM-Sd9q5L3dA1-Oh37Pq6OZcOBzkWch7xCWFH3Q3N80qumh9qQB-6J4KmSd5pquZFuJ1E-JcPPAWAFN39PyZ-LPSqmMJEcDvYZ_FR66c00isaxmPbCnERfq7x6M73BxcgtPSnf6WCA-IP5Rxp8uRFj4Vwwz9RQ4KX79cjTOSzBmW9LurjCCUyKLj3tGKZ940bnr_87EerljlFEQXqscuqTQZJFBAxSgyhNZMM8ED2HoQv-Hus8EBS8-96yjuBnC9"
        
def test_server_home():
    """Test the /ping endpoint."""
    response = requests.get(f"{BASE_URL}")
    logger.info(f"Response: {response.json()}")
    assert response.status_code == 200, "Expected status code 200, but got {response.status_code}"
    assert response.json()["message"] == "Welcome to the Performance Review API v2"

def test_generate_review():
    """Test the /generate_review endpoint."""
    logger.info("Testing /generate_review endpoint")
    url = f"{BASE_URL}/generate_review"
    logger.info(f"URL: {url}")
    payload = {
        "your_role": "PM",
        "candidate_role": "software developer",
        "your_review": "test - But please generate a detailed OUTPUT FOR TESTING",
        "is_paid":False
    }
    headers = {
        "accept": "application/json",
        "Authorization": f"Bearer {ACCESS_TOKEN}",
        "Content-Type": "application/json"
    }

    response = requests.post(url, headers=headers, json=payload)
    logger.info(f"Status Code: {response.status_code}")
    response_json = response.json()
    logger.info(json.dumps(response_json, indent=2))

    assert response.status_code == 200, f"Expected status code 200, but got {response.status_code}"
    assert "review" in response_json, "Response does not contain 'review' key"
    assert len(response_json["review"]) > 0, "Review list is empty"

def test_generate_self_review():
    """Test the /generate_self_review endpoint."""
    logger.info("Testing /generate_self_review endpoint")
    url = f"{BASE_URL}/generate_self_review"
    payload = {
        "text_dump": "this is test but please generate all the text",
        "questions": [
            "How i did this cycle?", "How can I improve"
        ],
        "instructions": "string",
        "is_paid": True
    }
    headers = {
        "accept": "application/json",
        "Authorization": f"Bearer {ACCESS_TOKEN}",
        "Content-Type": "application/json"
    }

    response = requests.post(url, headers=headers, json=payload)
    logger.info(f"Status Code: {response.status_code}")
    response_json = response.json()
    logger.info(json.dumps(response_json, indent=2))

    assert response.status_code == 200, f"Expected status code 200, but got {response.status_code}"
    assert "self_review" in response_json, "Response does not contain 'self_review' key"
    assert len(response_json["self_review"]) == 2, "Expected 2 self-review items"

def test_transcribe_audio():
    """Test the /transcribe_audio endpoint."""
    logger.info("Testing /transcribe_audio endpoint")
    url = f"{BASE_URL}/transcribe_audio"
    
    # Path to the audio file
    audio_file_path = "tests_backend/test_data/file_example_MP3_700KB.mp3"
    
    # Prepare the files for the request
    with open(audio_file_path, 'rb') as audio_file:
        files = {
            'file': ('file_example_MP3_700KB.mp3', audio_file, 'audio/mpeg')
        }
        
        params = {
            'is_paid': 'true'
        }
        
        headers = {
            "accept": "application/json",
            "Authorization": f"Bearer {ACCESS_TOKEN}"
        }

        response = requests.post(url, headers=headers, files=files, params=params)
        logger.info(f"Status Code: {response.status_code}")
        response_json = response.json()
        logger.info(json.dumps(response_json, indent=2))

        assert response.status_code == 200, f"Expected status code 200, but got {response.status_code}"
        assert "transcribed_text" in response_json, "Response does not contain 'transcribed_text' key"
        assert len(response_json["transcribed_text"]) > 0, "Transcribed text is empty"

if __name__ == "__main__":
    # Refresh the access token before running tests
    test_server_home()
    test_generate_review()
    test_generate_self_review()
    test_transcribe_audio()

#path: tests_backend/app_fastapi_v2.py