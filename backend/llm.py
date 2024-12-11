# Related third-party imports
import abc
from concurrent.futures import ThreadPoolExecutor
import os
import io
import tempfile
from dotenv import load_dotenv, find_dotenv
from typing import Dict, List, Optional

# LangChain and model-specific imports
from groq import Groq
import openai
import anthropic
import google.generativeai as genai
from backend.core.logger import logger

# Environment setup
from backend.core.config import Config

OPENAI_API_KEY = Config.APIKeys.OPENAI
GOOGLE_API_KEY = Config.APIKeys.GOOGLE
ANTHROPIC_API_KEY = Config.APIKeys.ANTHROPIC
GROQ_API_KEY = Config.APIKeys.GROQ
HELIECONE_API_KEY = Config.Helicone.API_KEY

MODEL_MAPPING = {
    "openai": {
        "small": "gpt-4o-mini",
        "medium": "gpt-4o",
        "large": "o1-mini"
    },
    "anthropic": {
        "small": "claude-3-haiku-20240307",
        "medium": "claude-3-5-sonnet-latest",
        "large": "claude-3-opus-20240229"
    },
    "groq": {
        "small": "llama3-8b-8192",
        "medium": "llama3-13b-8192",
        "large": "mixtral-8x7b-32768"
    },
    "google": {
        "small": "gemini-2.0-flash-exp",
        "medium": "gemini-2.0-flash-exp",
        "large": "gemini-1.5-pro-latest"
    }
}

class LLM(abc.ABC):
    def __init__(self, api_key: Optional[str] = None):
        self.api_key = api_key

    @abc.abstractmethod
    def generate_text(self, prompt: str, **kwargs) -> str:
        pass

    @abc.abstractmethod
    def stream_text(self, prompt: str, **kwargs):
        pass

class OpenAILLM(LLM):
    def __init__(self, api_key: Optional[str] = None):
        super().__init__(api_key or OPENAI_API_KEY)
        self.client = openai.OpenAI(
            api_key=self.api_key,
            base_url="https://oai.helicone.ai/v1",  # Set the API endpoint
            default_headers= {  # Optionally set default headers or set per request (see below)
                "Helicone-Auth": f"Bearer {HELIECONE_API_KEY}",
            }
        )   

    def generate_text(self, prompt: str, model: str = "large", **kwargs) -> str:
        model_name = MODEL_MAPPING["openai"][model]
        messages = [{"role": "user", "content": prompt}]
        response = self.client.chat.completions.create(
            model=model_name,
            messages=messages,
            temperature=kwargs.get("temperature", 0.2),
        )
        return response.choices[0].message.content
    
    def stream_text(self, prompt: str, model: str = "large", **kwargs):
        model_name = MODEL_MAPPING["openai"][model]
        messages = [{"role": "user", "content": prompt}]
        stream = self.client.chat.completions.create(
            model=model_name,
            messages=messages,
            temperature=kwargs.get("temperature", 0.2),
            stream=True
        )
        for chunk in stream:
            if chunk.choices[0].message['content'] is not None:
                yield chunk.choices[0].message['content']

class AnthropicLLM(LLM):
    def __init__(self, api_key: Optional[str] = None):
        super().__init__(api_key or ANTHROPIC_API_KEY)
        self.client = anthropic.Anthropic(
            api_key=self.api_key,
            base_url="https://anthropic.helicone.ai",
            default_headers={
                "Helicone-Auth": f"Bearer {HELIECONE_API_KEY}"
            },
        )

    def generate_text(self, prompt: str, model: str = "large", **kwargs) -> str:
        model_name = MODEL_MAPPING["anthropic"][model]
        response = self.client.messages.create(
            model=model_name,
            temperature=kwargs.get("temperature", 0.0),
            max_tokens=kwargs.get("max_tokens", 2048),
            messages=[{"role": "user", "content": prompt}]
        )
        return response.content[0].text
    
    def stream_text(self, prompt: str, model: str = "large", **kwargs):
        model_name = self.get_model_name(model)
        messages = [{"role": "user", "content": prompt}]
        with self.client.messages.stream(
            model=model_name,
            temperature=kwargs.get("temperature", 0.0),
            max_tokens=kwargs.get("max_tokens", 4096),
            messages=messages,
        ) as stream:
            for chunk in stream.text_stream:
                yield chunk
    

class GroqLLM(LLM):
    def __init__(self, api_key: Optional[str] = None):
        super().__init__(api_key or GROQ_API_KEY)
        self.client = Groq(api_key=self.api_key)

    def generate_text(self, prompt: str, model: str = "medium", **kwargs) -> str:
        model_name = MODEL_MAPPING["groq"][model]
        messages = [{"role": "system", "content": prompt}]
        response = self.client.chat.completions.create(
            model=model_name,
            messages=messages,
            temperature=kwargs.get("temperature", 0.2),
        )
        return response.choices[0].message.content

    def stream_text(self, prompt: str, model: str = "medium", **kwargs):
        model_name = MODEL_MAPPING["groq"][model]
        messages = [{"role": "user", "content": prompt}]
        stream = self.client.chat.completions.create(
            model=model_name,
            messages=messages,
            temperature=kwargs.get("temperature", 0.2),
            max_tokens=kwargs.get("max_tokens", 1024),
            top_p=kwargs.get("top_p", 1),
            stream=True
        )
        for chunk in stream:
            if chunk.choices[0].delta.content is not None:
                yield chunk.choices[0].delta.content
                
    def transcribe_audio(self, audio_bytes: bytes, **kwargs) -> str:
        with tempfile.NamedTemporaryFile(suffix=".wav", delete=False) as temp_file:
            temp_file.write(audio_bytes)
            temp_file_path = temp_file.name

        try:
            with open(temp_file_path, "rb") as audio_file:
                transcription = self.client.audio.transcriptions.create(
                    file=(temp_file_path, audio_file),
                    model="whisper-large-v3",
                    response_format="text",
                    language=kwargs.get("language", "en"),
                    temperature=kwargs.get("temperature", 0.0)
                )
            return transcription  # This is already a string, so we don't need to access .text
        finally:
            os.unlink(temp_file_path)
    
class GoogleLLM(LLM):
    SAFETY_SETTINGS = {
        'HATE': 'BLOCK_NONE',
        'HARASSMENT': 'BLOCK_NONE',
        'SEXUAL': 'BLOCK_NONE',
        'DANGEROUS': 'BLOCK_NONE'
    }

    def __init__(self, api_key: Optional[str] = None):
        super().__init__(api_key or GOOGLE_API_KEY)
        genai.configure(
            api_key=self.api_key,
            client_options={
                'api_endpoint': 'gateway.helicone.ai',
            },
            default_metadata=[
                ('helicone-auth', f'Bearer {HELIECONE_API_KEY}'),
                ('helicone-target-url', 'https://generativelanguage.googleapis.com')
            ],
            transport="rest"
        )   
        self.executor = ThreadPoolExecutor()

    def generate_text(self, prompt: str, model: str = "large", **kwargs) -> str:
        model_name = MODEL_MAPPING["google"][model]
        generation_config = {
            "temperature": kwargs.get("temperature", 0.2),
            "top_p": kwargs.get("top_p", 0.95),
            "top_k": kwargs.get("top_k", 64),
            "max_output_tokens": kwargs.get("max_tokens", 8192),
            "response_mime_type": "text/plain",
        }
        model = genai.GenerativeModel(model_name=model_name, generation_config=generation_config)
        response = model.generate_content(prompt, safety_settings=self.SAFETY_SETTINGS)
        return response.text

    def stream_text(self, prompt: str, model: str = "large", **kwargs):
        model_name = MODEL_MAPPING["google"][model]
        generation_config = {
            "temperature": kwargs.get("temperature", 0.2),
            "top_p": kwargs.get("top_p", 0.95),
            "top_k": kwargs.get("top_k", 64),
            "max_output_tokens": kwargs.get("max_tokens", 8192),
            "response_mime_type": "text/plain",
        }
        model = genai.GenerativeModel(model_name=model_name, generation_config=generation_config)
        for chunk in model.generate_content(prompt, stream=True, safety_settings=self.SAFETY_SETTINGS):
            yield chunk.text