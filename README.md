# 🚀 Performance Review AI
Generate performance reviews and self-reviews in minutes using Large Language Models (LLMs).

https://github.com/user-attachments/assets/81e62eda-b12c-4697-9469-d904fd8ee4ed

## ✨ Features

- Performance Review Generation
- Self-Review Generation
- Support for multiple LLM providers (OpenAI, Google, Anthropic, Groq)
- Audio input for reviews (with transcription for Groq LLM)
- Streamlit web interface
- FastAPI backend for API access

## Installation

1. Clone the repository

2. Create a virtual environment

```bash
python -m venv .venv
```

3. Install the required packages:

```bash
pip install -r requirements.txt
```

4. Use the following command to run the Streamlit app and FastAPI backend:

```bash
streamlit run app.py
```

This will start the web interface where you can:
- Choose between Performance Review and Self-Review
- Select LLM provider and model size
- Input your API key
- Enter review details or record audio
- Generate reviews based on your input

Run the FastAPI server:

```bash
uvicorn backend.app_fastapi:app --host 0.0.0.0 --port 8000
```

API endpoints:
- POST `/generate_review`: Generate a performance review
- POST `/generate_self_review`: Generate a self-review

### Using Docker

1. **Build the Docker Image:**

   Navigate to the root directory of the project and run:

   ```bash
   docker build -t performance-review-api .
   ```

2. **Run the Docker Container:**

   Start the Docker container:

   ```bash
   docker run -p 8000:8000 performance-review-api
   ```

   This command maps port 8000 on your local machine to port 8000 in the Docker container, making the FastAPI application accessible at `http://localhost:8000`.

3. **Verify the Application is Running:**

   Open a web browser and navigate to `http://localhost:8000`. You should see the welcome message defined in the `root` endpoint.

   You can also use `curl` to test the root endpoint:

   ```bash
   curl http://localhost:8000/
   ```

   You should see a response like:

   ```json
   {"message": "Welcome to the Performance Review API"}
   ```

## Key Components

### review.py
- `ReviewRequest`: Pydantic model for performance review requests
- `generate_review()`: Main function to generate performance reviews
- Supports custom questions or uses default questions

### self_review.py
- `SelfReviewRequest`: Pydantic model for self-review requests
- `generate_self_review()`: Main function to generate self-reviews
- Allows for custom questions and additional instructions

### app.py
- Streamlit interface for both performance reviews and self-reviews
- Audio recording and transcription support
- Dynamic form based on review type selection

### app_fastapi.py
- FastAPI backend with endpoints for generating reviews and self-reviews
- CORS middleware enabled for API access from different origins

## LLM Support

Supported LLM providers:
- OpenAI
- Google
- Anthropic
- Groq

## Note

Make sure to provide your own API key for the selected LLM provider when using the application.
