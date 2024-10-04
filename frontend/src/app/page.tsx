'use client';

import { useState } from 'react';
import AppIntro from './home/AppIntro';
import PerformanceReview from './home/PerformanceReview';
import SelfReview from './home/SelfReview';
import ReviewResults from './home/ReviewResults';
import { ReviewType } from '@constants/common';
import { isEmptyArray } from '@utils/object';

interface ReviewItem {
  question: string;
  answer: string;
}

const groqKeyFromEnv = process.env.NEXT_PUBLIC_GROQ_API_KEY || ''; // remove this one sidebar design is finalised for `keys needed` UI
const keysNeeded = process.env.NEXT_PUBLIC_KEYS_NEEDED === 'true';

export default function Home() {
  const [reviewType, setReviewType] = useState(ReviewType.perfReview);
  const [llmType, _setLlmType] = useState('groq');
  const [modelSize, _setModelSize] = useState('small');
  const [userApiKey, _setUserApiKey] = useState<string>(groqKeyFromEnv);
  const [groqApiKey, _setGroqApiKey] = useState<string>(groqKeyFromEnv);
  const [reviewResults, setReviewResults] = useState<ReviewItem[]>([]);
  const paramsWhenKeysNeeded = keysNeeded ? { llmType, modelSize, userApiKey, groqApiKey } : {};

  const onReviewTypeChange = (reviewType: string) => {
    setReviewType(reviewType);
    setReviewResults([]);
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* <Sidebar
        onReviewTypeChange={(value: string) => setReviewType(value)}
        onLlmTypeChange={(value: string) => setLlmType(value)}
        onModelSizeChange={(value: string) => setModelSize(value)}
        onUserApiKeyChange={(value: string) => setUserApiKey(value)}
        onGroqApiKeyChange={(value: string) => setGroqApiKey(value)}
      /> */}
      {/* App Introduction */}
      <AppIntro onReviewTypeChange={onReviewTypeChange} />
      {/* Performance Review and Self Review */}
      {reviewType === ReviewType.perfReview ? (
        <PerformanceReview
          paramsWhenKeysNeeded={paramsWhenKeysNeeded}
          onReviewResultsReceived={setReviewResults}
        />
      ) : (
        <SelfReview
          paramsWhenKeysNeeded={paramsWhenKeysNeeded}
          onReviewResultsReceived={setReviewResults}
        />
      )}
      {!isEmptyArray(reviewResults) && (
        <ReviewResults reviews={reviewResults} />
      )}
    </div>
  );
}
