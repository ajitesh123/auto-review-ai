import unittest
import os
from unittest.mock import patch, MagicMock
import speech_recognition as sr
from audio_utils import transcribe_audio, validate_audio_file, AudioTranscriptionError

class TestAudioUtils(unittest.TestCase):
    def test_transcribe_audio_success(self):
        with patch('speech_recognition.Recognizer.recognize_google') as mock_recognize:
            mock_recognize.return_value = "This is a test transcription"
            result = transcribe_audio("test_audio.wav")
            self.assertEqual(result, "This is a test transcription")

    def test_transcribe_audio_unknown_value_error(self):
        with patch('speech_recognition.Recognizer.recognize_google') as mock_recognize:
            mock_recognize.side_effect = sr.UnknownValueError()
            with self.assertRaises(AudioTranscriptionError):
                transcribe_audio("test_audio.wav")

    def test_transcribe_audio_request_error(self):
        with patch('speech_recognition.Recognizer.recognize_google') as mock_recognize:
            mock_recognize.side_effect = sr.RequestError("Test error")
            with self.assertRaises(AudioTranscriptionError):
                transcribe_audio("test_audio.wav")

    def test_validate_audio_file_valid(self):
        mock_file = MagicMock()
        mock_file.name = "test.wav"
        mock_file.size = 5 * 1024 * 1024  # 5 MB
        self.assertTrue(validate_audio_file(mock_file))

    def test_validate_audio_file_invalid_extension(self):
        mock_file = MagicMock()
        mock_file.name = "test.txt"
        mock_file.size = 5 * 1024 * 1024  # 5 MB
        self.assertFalse(validate_audio_file(mock_file))

    def test_validate_audio_file_too_large(self):
        mock_file = MagicMock()
        mock_file.name = "test.wav"
        mock_file.size = 15 * 1024 * 1024  # 15 MB
        self.assertFalse(validate_audio_file(mock_file))

if __name__ == '__main__':
    unittest.main()
