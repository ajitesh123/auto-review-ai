# 🚀 OpenHR AI: Write better performance reviews in minutes
[![Website](https://img.shields.io/badge/Website-getopenhrai.com-blue)](https://www.getopenhrai.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

In our career at big and startups, we have hardly enjoyed HR workflow eventhough they are critical part of firms and meant to be simple and helpful. In our small ways, we want to fix it by building tools that make HR workflow simple, helpful, and feel-like coaching vs what it is today - complex, stressful, and time-consuming.

If this is something that excites you, please reach out to us at [ajabhish@gmail.com](mailto:ajabhish@gmail.com).

Demo of our first tool:

https://github.com/user-attachments/assets/21f7a559-d007-4098-9b42-dff2aee08c6b

We aim to keep this open source so that you can use it with no strings attached, contribute to it, and make something useful for the world.

## ✨ Existing Features

- Performance Review Generation
- Self-Review Generation
- Support for multiple LLM providers (OpenAI, Google, Anthropic, Groq)
- Audio input for reviews (with transcription for Groq LLM)
- Streamlit web interface
- FastAPI backend for API access

## 🚀 Getting Started

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

## How to contribute

We welcome contributions from the community! If you'd like to contribute to this project, please follow these steps:

1. Fork the repository
2. Create a new branch
3. Make your changes
4. Create a pull request

Also, this is the first tool in the set of tools we want to build to simplify HR workflow and make what it should about - simple, helpful, feel-like coaching vs what it is today - complex, stressful, and time-consuming.

## 📧 Contact
- 📧 Email: [ajabhish@gmail.com](mailto:ajabhish@gmail.com)
- 🌐 Website: [getopenhrai.com](https://www.getopenhrai.com/)

## 📝 License

This project is open-sourced under the MIT License - see the [LICENSE](LICENSE) file for details.

---

<p align="center">Made with ❤️ by the OpenHR AI Team</p>