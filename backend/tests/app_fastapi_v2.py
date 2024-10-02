from loguru import logger
import json
import urllib.request
import urllib.error
import io


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

def send_request(url, payload=None, files=None):
    """Send a POST request to the specified URL with the given payload and files."""
    boundary = 'wL36Yn8afVp8Ag7AmP8qZ0SA4n1v9T'
    headers = {
        "Accept": "application/json",
        "Content-Type": f"multipart/form-data; boundary={boundary}"
    }

    body = io.BytesIO()

    # Add form fields and files
    if payload:
        for key, value in payload.items():
            body.write(f'--{boundary}\r\nContent-Disposition: form-data; name="{key}"\r\n\r\n{value}\r\n'.encode('utf-8'))
    if files:
        file_name, file_data, content_type = files['file']
        body.write(f'--{boundary}\r\nContent-Disposition: form-data; name="file"; filename="{file_name}"\r\nContent-Type: {content_type}\r\n\r\n'.encode('utf-8'))
        body.write(file_data + b'\r\n')

    body.write(f'--{boundary}--\r\n'.encode('utf-8'))
    
    req = urllib.request.Request(url, data=body.getvalue(), headers=headers, method='POST')
    
    try:
        with urllib.request.urlopen(req) as response:
            return response.status, response.read().decode('utf-8')
    except urllib.error.HTTPError as e:
        return e.code, e.read().decode('utf-8')

def test_transcribe_audio():
    """Test the /transcribe_audio endpoint."""
    logger.info("Testing /transcribe_audio endpoint")
    url = f"{BASE_URL}/transcribe_audio?is_paid=true"
    
    # Path to the audio file
    audio_file_path = "backend/tests/test_data/file_example_MP3_700KB.mp3"
    
    # Prepare the files for the request
    with open(audio_file_path, 'rb') as audio_file:
        file_data = audio_file.read()
    
    files = {
        'file': ('file_example_MP3_700KB.mp3', file_data, 'audio/mpeg')
    }

    try:
        status, response = send_request(url, files=files)
        logger.info(f"Status Code: {status}")
        response_json = json.loads(response)
        logger.info(json.dumps(response_json, indent=2))

        assert status == 200, f"Expected status code 200, but got {status}"
        assert "transcribed_text" in response_json, "Response does not contain 'transcribed_text' key"
        assert len(response_json["transcribed_text"]) > 0, "Transcribed text is empty"
        
    except Exception as e:
        logger.error(f"Error occurred: {str(e)}")
        raise

if __name__ == "__main__":
    # test_generate_review()
    # print("\n" + "-"*50 + "\n")
    # test_generate_self_review()
    print("\n" + "-"*50 + "\n")
    test_transcribe_audio()