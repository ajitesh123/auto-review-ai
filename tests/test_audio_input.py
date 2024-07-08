import unittest
from unittest.mock import patch, MagicMock
from app import convert_speech_to_text
from review import generate_review
from self_review import generate_self_review

class TestAudioInput(unittest.TestCase):
    @patch('app.Groq')
    def test_convert_speech_to_text(self, mock_groq):
        mock_client = MagicMock()
        mock_groq.return_value = mock_client
        mock_client.audio.transcriptions.create.return_value = MagicMock(text="Test transcription")

        audio_bytes = b"dummy audio data"
        result = convert_speech_to_text(audio_bytes, "fake_api_key")
        self.assertEqual(result, "Test transcription")

    @patch('review.create_llm_instance')
    def test_generate_review_with_audio(self, mock_create_llm):
        mock_llm = MagicMock()
        mock_create_llm.return_value = mock_llm
        mock_llm.generate_text.return_value = "<output><question>Q1</question><answer>A1</answer></output>"

        result = generate_review("Manager", "Employee", "How did they perform?", "Good work", "openai", "fake_api_key", "small", "Audio review content")
        self.assertEqual(len(result), 1)
        self.assertEqual(result[0]["question"], "Q1")
        self.assertEqual(result[0]["answer"], "A1")

    @patch('self_review.create_llm_instance')
    def test_generate_self_review_with_audio(self, mock_create_llm):
        mock_llm = MagicMock()
        mock_create_llm.return_value = mock_llm
        mock_llm.generate_text.return_value = "<self-review><question1>Q1</question1><answer1>A1</answer1></self-review>"

        result = generate_self_review("Text dump", ["Q1"], None, "openai", "fake_api_key", "small", "Audio review content")
        self.assertEqual(len(result), 1)
        self.assertEqual(result[0]["question"], "Q1")
        self.assertEqual(result[0]["answer"], "A1")

if __name__ == '__main__':
    unittest.main()
