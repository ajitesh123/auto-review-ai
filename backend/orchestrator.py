import yaml
from backend.review import generate_review as generate_review_v1
from backend.self_review import generate_self_review as generate_self_review_v1
from backend.llm import AnthropicLLM, GroqLLM, GoogleLLM
from backend.core.config import Config


def get_api_key(service):
    return getattr(Config.APIKeys, service.upper(), None)

def get_llm_config(is_paid, service):
    if is_paid:
        if service in ['review', 'self_review']:
            return 'anthropic', get_api_key('anthropic'), 'medium'
        elif service == 'transcription':
            return 'groq', get_api_key('groq'), 'small'
    else:
        if service in ['review', 'self_review']:
            return 'google', get_api_key('google'), 'small'
        elif service == 'transcription':
            return 'groq', get_api_key('groq'), 'small'

def generate_review(is_paid, **kwargs):
    llm_type, user_api_key, model_size = get_llm_config(is_paid, 'review')
    return generate_review_v1(
        llm_type=llm_type,
        user_api_key=user_api_key,
        model_size=model_size,
        **kwargs
    )

def generate_self_review(is_paid, **kwargs):
    llm_type, user_api_key, model_size = get_llm_config(is_paid, 'self_review')
    return generate_self_review_v1(
        llm_type=llm_type,
        user_api_key=user_api_key,
        model_size=model_size,
        **kwargs
    )

def transcribe_audio(is_paid, audio_bytes):
    llm_type, api_key, _ = get_llm_config(is_paid, 'transcription')
    llm = GroqLLM(api_key=api_key)
    return llm.transcribe_audio(audio_bytes)