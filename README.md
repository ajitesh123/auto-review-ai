# 🚀 Performance Review AI
Generate performance reviews and self-reviews in minutes using Large Language Models (LLMs).

![Performance Review AI Demo](https://github.com/user-attachments/assets/81e62eda-b12c-4697-9469-d904fd8ee4ed)

## ✨ Features

- 📝 Performance Review Generation
- 🔍 Self-Review Generation
- 🤖 Support for multiple LLM providers (OpenAI, Google, Anthropic, Groq)
- 🎙️ Audio input for reviews (with transcription for Groq LLM)
- 🌐 Streamlit web interface
- 🚀 FastAPI backend for API access

## 🛠️ Installation

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
- 🔄 Choose between Performance Review and Self-Review
- 🤖 Select LLM provider and model size
- 🔑 Input your API key
- ✏️ Enter review details or record audio
- 🎉 Generate reviews based on your input

Run the FastAPI server:

```bash
uvicorn backend.app_fastapi:app --host 0.0.0.0 --port 8000
```

API endpoints:
- 📊 POST `/generate_review`: Generate a performance review
- 🔍 POST `/generate_self_review`: Generate a self-review

## 🧩 Key Components

### 📝 review.py
- `ReviewRequest`: Pydantic model for performance review requests
- `generate_review()`: Main function to generate performance reviews
- Supports custom questions or uses default questions

### 🔍 self_review.py
- `SelfReviewRequest`: Pydantic model for self-review requests
- `generate_self_review()`: Main function to generate self-reviews
- Allows for custom questions and additional instructions

### 🌐 app.py
- Streamlit interface for both performance reviews and self-reviews
- Audio recording and transcription support
- Dynamic form based on review type selection

### 🚀 app_fastapi.py
- FastAPI backend with endpoints for generating reviews and self-reviews
- CORS middleware enabled for API access from different origins

## 🤖 LLM Support

Supported LLM providers:
- OpenAI
- Google
- Anthropic
- Groq

## ⚠️ Note

Make sure to provide your own API key for the selected LLM provider when using the application.
