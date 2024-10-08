import dynamic from 'next/dynamic';
import { useCallback, useEffect, useState } from 'react';
import { transcribeAudioBlob } from '@services/audio';
import { isBlankObject, isObject } from '@utils/object';
import { ShimmerText } from 'shimmer-effects-react';

// Dynamically import ReactMediaRecorder to avoid server-side rendering issues
const DynamicMediaRecorder = dynamic(
  () => import('react-media-recorder').then((mod) => mod.ReactMediaRecorder),
  { ssr: false }
);

const AudioInput = ({ paramsWhenKeysNeeded, onTranscriptionReceived }: any) => {
  const [isClient, setIsClient] = useState(false);
  const [transcription, setTranscription] = useState<string>(''); // New state for transcription
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isInitiated, setIsInitiated] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const transcribeAudio = useCallback(
    async (audioBlob: Blob) => {
      if (!audioBlob) {
        alert('Please provide an audio recording.');
        return '';
      }
      if (
        !isBlankObject(paramsWhenKeysNeeded) &&
        !paramsWhenKeysNeeded?.groqApiKey
      ) {
        alert('Please provide Groq API key.');
        return '';
      }

      const formData = new FormData();
      formData.append('file', audioBlob, 'audio.wav');
      if (!isBlankObject(paramsWhenKeysNeeded)) {
        formData.append('groq_api_key', paramsWhenKeysNeeded?.groqApiKey);
      } else {
        formData.append('is_paid', 'false');
      }

      try {
        setIsInitiated(true);
        setIsLoading(true);
        const response = (await transcribeAudioBlob(formData)) as {
          transcribed_text: string;
        };
        console.log('Transcription response:', response);
        const transcribedText = response.transcribed_text;
        setIsError(false);
        // Set transcription state
        setTranscription(transcribedText);
        onTranscriptionReceived(transcribedText);
      } catch (error: unknown) {
        setIsError(true);
        console.error('Error transcribing audio:', error);
        // Check if error is an object and has a 'response' property
        if (
          error &&
          isObject(error) &&
          'response' in error &&
          (error as any).response
        ) {
          console.error('Server response:', (error as any).response.data);
        } else {
          console.error('Unexpected error:', error);
        }
        setTranscription('Unable to transcribe text');
      } finally {
        setIsLoading(false);
      }
    },
    [paramsWhenKeysNeeded, onTranscriptionReceived]
  );

  return (
    <>
      <div className="mb-8">
        <label className="block text-milk text-sm font-bold mb-2">
          Record Audio Review (optional)
        </label>
        {isClient && (
          <DynamicMediaRecorder
            audio
            onStop={async (_blobUrl, blob) => {
              await transcribeAudio(blob); // Transcribe audio on stop
            }}
            render={({
              status,
              startRecording,
              stopRecording,
              mediaBlobUrl,
            }) => (
              <div>
                <p>{status}</p>
                <button
                  onClick={startRecording}
                  className="mr-2 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
                >
                  Start Recording
                </button>
                <button
                  onClick={stopRecording}
                  className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700"
                >
                  Stop Recording
                </button>
                {mediaBlobUrl && (
                  <audio src={mediaBlobUrl} controls className="mt-2" />
                )}
              </div>
            )}
          />
        )}
      </div>

      {/* Display Transcribed Text */}
      {isInitiated && (
        <div className="mb-4">
          <label className="block text-milk text-sm font-medium mb-2">
            {isLoading ? 'Transcribing...' : 'Transcribed Text'}
          </label>
          <div className="w-full md-4 px-3 py-2  border rounded bg-background">
            {isLoading ? (
              <ShimmerText className="m-4" mode="dark" line={3} gap={20} />
            ) : (
              <p className={`${isError ? 'text-red-400' : ''}`}>
                {transcription}
              </p>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default AudioInput;
