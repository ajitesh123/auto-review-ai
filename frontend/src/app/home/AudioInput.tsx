import { useCallback, useEffect, useRef, useState } from 'react';
import { transcribeAudioBlob } from '@services/audio';
import { isBlankObject, isObject } from '@utils/object';
import { ShimmerText } from 'shimmer-effects-react';
import { useWavesurfer } from '@wavesurfer/react';
import { useAppContext } from '@contexts/AppContext';
import { ReviewType } from '@constants/common';
import { MediaRecorder } from '@constants/media';
import { useReactMediaRecorder } from 'react-media-recorder';
import { SvgIcon } from '@components/ui/svg-icon';
import Mic from '@assets/icons/mic.svg';
import Stop from '@assets/icons/stop.svg';
import Play from '@assets/icons/play.svg';
import Pause from '@assets/icons/pause.svg';
import { useFlashMessage } from '@components/ui/flash-messages';

interface WaveSurferColors {
  wave: string;
  progress: string;
}

interface WaveSurferColorsMap {
  [key: string]: WaveSurferColors;
}

// Accessing using a known key
const getWaveSurferColor = (
  waveSurferColors: WaveSurferColorsMap,
  reviewType: string
) => {
  return waveSurferColors[reviewType];
};

// check if audio recording is on
const isAudioRecording = (status: string) => {
  return status === MediaRecorder.RECORDING;
};

const AudioInput = ({ paramsWhenKeysNeeded, onTranscriptionReceived }: any) => {
  const { addInfoMessage, addFailureMessage } = useFlashMessage();
  const { reviewType, accessToken } = useAppContext();
  const [transcription, setTranscription] = useState<string>(''); // New state for transcription
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isInitiated, setIsInitiated] = useState(false);
  const [blobUrl, setBlobUrl] = useState('');
  const containerRef = useRef(null);
  const [waveSurferColors, setWaveSurferColors] = useState(
    {} as WaveSurferColorsMap
  );

  const transcribeAudio = useCallback(
    async (audioBlob: Blob) => {
      if (!audioBlob) {
        addFailureMessage({
          message: 'Please provide an audio recording.',
          autoClose: false,
        });
        return '';
      }
      if (
        !isBlankObject(paramsWhenKeysNeeded) &&
        !paramsWhenKeysNeeded?.groqApiKey
      ) {
        addFailureMessage({
          message: 'Please provide Groq API key.',
          autoClose: false,
        });
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
        addFailureMessage({
          message: 'Error in transcribing audio',
          autoClose: false,
        });
      } finally {
        setIsLoading(false);
      }
    },
    [paramsWhenKeysNeeded, onTranscriptionReceived, addFailureMessage]
  );

  // media recorder
  const { status, startRecording, stopRecording } = useReactMediaRecorder({
    video: false,
    audio: true,
    async onStop(blobUrl, blob) {
      setBlobUrl(blobUrl);
      await transcribeAudio(blob); // Transcribe audio on stop
    },
  });

  const isRecording = isAudioRecording(status);

  const handleStartRecording = useCallback(() => {
    if (!accessToken) {
      addInfoMessage({ message: 'Please login to use this feature' });
      return;
    }
    startRecording();
    setBlobUrl('');
  }, [setBlobUrl, startRecording, accessToken, addInfoMessage]);

  useEffect(() => {
    // Get the root element (:root in CSS)
    const rootElement = document.documentElement;
    const computedStyles = getComputedStyle(rootElement);
    const waveSurferColors: WaveSurferColorsMap = {
      perfReview: {
        wave: computedStyles.getPropertyValue('--perf-review-500').trim(),
        progress: computedStyles.getPropertyValue('--perf-review-600').trim(),
      },
      selfReview: {
        wave: computedStyles.getPropertyValue('--self-review-500').trim(),
        progress: computedStyles.getPropertyValue('--self-review-600').trim(),
      },
    };
    // set the colors
    setWaveSurferColors(waveSurferColors);
  }, []);

  const color = getWaveSurferColor(
    waveSurferColors,
    reviewType === ReviewType.perfReview ? 'perfReview' : 'selfReview'
  );

  // wave surfer
  const { wavesurfer, isPlaying } = useWavesurfer({
    container: containerRef,
    height: 30,
    barHeight: 10,
    barWidth: 1,
    waveColor: color?.wave,
    progressColor: color?.progress,
    url: blobUrl,
  });

  const onPlayPause = useCallback(() => {
    wavesurfer && wavesurfer.playPause();
  }, [wavesurfer]);

  return (
    <>
      <div className="mb-8">
        <label className="block text-milk text-sm font-bold mb-6">
          Record Audio Review (optional)
        </label>
        <div className="mb-8 flex justify-center items-center gap-6">
          <button
            onClick={isRecording ? stopRecording : handleStartRecording}
            className={`relative rounded-full w-14 h-14 flex items-center justify-center bg-red-400 hover:bg-red-500 ${
              isRecording ? 'animation-pulse' : ''
            }`}
            disabled={isRecording}
            aria-label={isRecording ? 'Stop recording' : 'Start recording'}
          >
            <SvgIcon svg={Mic} size="xl" />
          </button>

          {isRecording && (
            <button
              onClick={stopRecording}
              className="relative rounded-full w-14 h-14 flex items-center justify-center border border-gray-500 hover:bg-neutral-800"
            >
              <SvgIcon svg={Stop} size="lg" />
            </button>
          )}

          {blobUrl && (
            <button
              onClick={onPlayPause}
              className="relative rounded-full w-14 h-14 flex items-center justify-center border border-gray-500 hover:bg-neutral-800"
            >
              <SvgIcon svg={isPlaying ? Pause : Play} size="lg" />
            </button>
          )}

          {blobUrl && (
            <div className="flex flex-1 items-center gap-4">
              <div ref={containerRef} className="w-full" />
            </div>
          )}
        </div>
      </div>

      {/* Display Transcribed Text */}
      {isInitiated && (
        <div className="mb-4 mt-8">
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
