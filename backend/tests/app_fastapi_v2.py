from loguru import logger
import json
import os
import pyttsx3
import urllib.request
import urllib.error

# Base URL for the FastAPI server
BASE_URL = "http://0.0.0.0:8000/v2"

def send_request(url, payload):
    """Send a POST request to the specified URL with the given payload."""
    data = json.dumps(payload).encode('utf-8')
    headers = {
        "Content-Type": "application/json",
        "Accept": "application/json"
    }
    req = urllib.request.Request(url, data=data, headers=headers, method='POST')
    
    try:
        with urllib.request.urlopen(req) as response:
            return response.status, response.read().decode('utf-8')
    except urllib.error.HTTPError as e:
        return e.code, e.read().decode('utf-8')

def test_generate_review():
    """Test the /generate_review endpoint."""
    logger.info("Testing /generate_review endpoint")
    url = f"{BASE_URL}/generate_review"
    payload = {
        "your_role": "PM",
        "candidate_role": "software developer",
        "your_review": "test - please generate all the output",
        "is_paid": False
    }

    status, response = send_request(url, payload)
    logger.info(f"Status Code: {status}")
    response_json = json.loads(response)
    logger.info(json.dumps(response_json, indent=2))

    assert status == 200, f"Expected status code 200, but got {status}"
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

    status, response = send_request(url, payload)
    logger.info(f"Status Code: {status}")
    response_json = json.loads(response)
    logger.info(json.dumps(response_json, indent=2))

    assert status == 200, f"Expected status code 200, but got {status}"
    assert "self_review" in response_json, "Response does not contain 'self_review' key"
    assert len(response_json["self_review"]) == 2, "Expected 2 self-review items"




if __name__ == "__main__":
    test_generate_review()
    print("\n" + "-"*50 + "\n")
    test_generate_self_review()