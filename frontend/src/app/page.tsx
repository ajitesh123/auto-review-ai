'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Sidebar from './home/Sidebar';
import { generateReview, generateSelfReview } from '@services/review';
import { transcribeAudioBlob } from '@services/audio';
import { TextButton } from '@components/ui/button';
import AppIntro from './home/AppIntro';
import PerformanceReview from './home/PerformanceReview';
import SelfReview from './home/SelfReview';
import ReviewResults from './home/ReviewResults';
import { ReviewType } from '@constants/common';

// Dynamically import ReactMediaRecorder to avoid server-side rendering issues
const DynamicMediaRecorder = dynamic(
  () => import('react-media-recorder').then((mod) => mod.ReactMediaRecorder),
  { ssr: false }
);

interface ReviewItem {
  question: string;
  answer: string;
}

export default function Home() {
  const [reviewType, setReviewType] = useState(ReviewType.perfReview);
  const [llmType, setLlmType] = useState('groq');
  const [modelSize, setModelSize] = useState('small');
  const [userApiKey, setUserApiKey] = useState('');
  const [groqApiKey, setGroqApiKey] = useState<string>('');
  const [yourRole, setYourRole] = useState('');
  const [candidateRole, setCandidateRole] = useState('');
  const [perfQuestion, setPerfQuestion] = useState('');
  const [yourReview, setYourReview] = useState('');
  const [textDump, setTextDump] = useState('');
  const [questions, setQuestions] = useState('');
  const [instructions, setInstructions] = useState('');
  const [review, setReview] = useState<ReviewItem[]>([]);
  const [transcription, setTranscription] = useState<string>(''); // New state for transcription
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const transcribeAudio = async () => {
    if (!audioBlob || !groqApiKey) {
      alert('Please provide an audio recording and Groq API key.');
      return '';
    }

    const formData = new FormData();
    formData.append('file', audioBlob, 'audio.wav');
    formData.append('groq_api_key', groqApiKey);

    try {
      const response = (await transcribeAudioBlob(formData)) as {
        transcribed_text: string;
      };
      console.log('Transcription response:', response);
      setTranscription(response.transcribed_text); // Set transcription state
      return response.transcribed_text;
    } catch (error: unknown) {
      console.error('Error transcribing audio:', error);

      // Check if error is an object and has a 'response' property
      if (
        error &&
        typeof error === 'object' &&
        'response' in error &&
        (error as any).response
      ) {
        console.error('Server response:', (error as any).response.data);
      } else {
        console.error('Unexpected error:', error);
      }

      return '';
    }
  };

  const handleGenerateReview = async () => {
    if (!userApiKey) {
      alert('Please enter your API key.');
      return;
    }

    let transcribedText = '';
    if (audioBlob) {
      transcribedText = await transcribeAudio();
    }

    try {
      const requestData = {
        your_role: yourRole,
        candidate_role: candidateRole,
        perf_question: perfQuestion,
        your_review: yourReview + transcribedText,
        llm_type: llmType,
        user_api_key: userApiKey,
        model_size: modelSize,
      };

      const response = (await generateReview(requestData)) as {
        review: Array<{ question: string; answer: string }>;
      };
      setReview(response.review);
    } catch (error) {
      console.error('Error generating review:', error);
    }
  };

  const handleGenerateSelfReview = async () => {
    if (!userApiKey) {
      alert('Please enter your API key.');
      return;
    }

    let transcribedText = '';
    if (audioBlob) {
      transcribedText = await transcribeAudio();
    }

    try {
      const requestData = {
        text_dump: textDump + transcribedText,
        questions: questions
          .split('\n')
          .map((q) => q.trim())
          .filter(Boolean),
        instructions: instructions || null,
        llm_type: llmType,
        user_api_key: userApiKey,
        model_size: modelSize,
      };

      const response = (await generateSelfReview(requestData)) as {
        self_review: Array<{ question: string; answer: string }>;
      };
      setReview(response.self_review);
    } catch (error) {
      console.error('Error generating self-review:', error);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Sidebar */}
      {/* <Sidebar
        onReviewTypeChange={(value: string) => setReviewType(value)}
        onLlmTypeChange={(value: string) => setLlmType(value)}
        onModelSizeChange={(value: string) => setModelSize(value)}
        onUserApiKeyChange={(value: string) => setUserApiKey(value)}
        onGroqApiKeyChange={(value: string) => setGroqApiKey(value)}
      /> */}
      {/* App Introduction */}
      <AppIntro onReviewTypeChange={setReviewType} />
      {/* Performance Review */} {/* Self Review */}
      {reviewType === ReviewType.perfReview ? (
        <PerformanceReview userApiKey={userApiKey} groqApiKey={groqApiKey} />
      ) : (
        <SelfReview userApiKey={userApiKey} groqApiKey={groqApiKey} />
      )}
      {review && <ReviewResults review={review} />}
    </div>
  );
}
