from groq import Groq
import tempfile
import os

def convert_speech_to_text(audio_data: bytes, api_key: str) -> str:
    client = Groq(api_key=api_key)

    with tempfile.NamedTemporaryFile(suffix=".wav", delete=False) as temp_file:
        temp_file.write(audio_data)
        temp_file_path = temp_file.name

    try:
        with open(temp_file_path, "rb") as audio_file:
            transcription = client.audio.transcriptions.create(
                file=(temp_file_path, audio_file.read()),
                model="whisper-large-v3",
                response_format="text"
            )
    finally:
        os.unlink(temp_file_path)

    return transcription.text
