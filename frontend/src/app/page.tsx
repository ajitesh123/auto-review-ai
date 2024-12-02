'use client';

import { useEffect, useState } from 'react';
import { useAppContext } from '@contexts/AppContext';

import AppIntro from './home/AppIntro';
import Pricing from '@components/Pricing';
import Testimonials from './home/Testimonials';
import HowItWorks from './home/HowItWorks';
import Review from './home/Review';

interface ReviewItem {
  question: string;
  answer: string;
}

const groqKeyFromEnv = process.env.NEXT_PUBLIC_GROQ_API_KEY || ''; // remove this one sidebar design is finalised for `keys needed` UI
const keysNeeded = process.env.NEXT_PUBLIC_KEYS_NEEDED === 'true';

export default function Home() {
  const { reviewType, updateReviewType } = useAppContext();

  const [llmType, _setLlmType] = useState('groq');
  const [modelSize, _setModelSize] = useState('small');
  const [userApiKey, _setUserApiKey] = useState<string>(groqKeyFromEnv);
  const [groqApiKey, _setGroqApiKey] = useState<string>(groqKeyFromEnv);
  const [reviewResults, setReviewResults] = useState<ReviewItem[]>([]);
  const paramsWhenKeysNeeded = keysNeeded
    ? { llmType, modelSize, userApiKey, groqApiKey }
    : {};

  const onReviewTypeChange = (reviewType: string) => {
    updateReviewType(reviewType);
    setReviewResults([]);
  };

  useEffect(() => {
    // Use Intersection Observer to determine if objects are within the viewport
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          return;
        }
        entry.target.classList.remove('in-view');
      });
    });
    // Get all the elements with the .animate class applied
    const allAnimatedElements = document.querySelectorAll('.animate');
    // Add the observer to each of those elements
    allAnimatedElements.forEach((element) => observer.observe(element));
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      {/* <Sidebar
        onLlmTypeChange={(value: string) => setLlmType(value)}
        onModelSizeChange={(value: string) => setModelSize(value)}
        onUserApiKeyChange={(value: string) => setUserApiKey(value)}
        onGroqApiKeyChange={(value: string) => setGroqApiKey(value)}
      /> */}

      {/* App Introduction */}
      <AppIntro
        reviewType={reviewType}
        onReviewTypeChange={onReviewTypeChange}
      />

      {/* Review Section -> Main Product */}
      <Review
        reviewType={reviewType}
        paramsWhenKeysNeeded={paramsWhenKeysNeeded}
        reviewResults={reviewResults}
        setReviewResults={setReviewResults}
        onReviewResultsReceived={setReviewResults}
      />

      {/* How It works */}
      <HowItWorks />

      {/* Testimonials */}
      <Testimonials />

      {/* Pricing */}
      <Pricing />
    </div>
  );
}
