import { Switch } from '@components/ui/switch';
import React, { useState } from 'react';
import { isPerfReviewType, ReviewType } from '@constants/common';
import { TextButton } from '@components/ui/button';
import GradientBackground from '@components/GradientBackground';
import Background from '@assets/icons/background.png';

const AppIntro = ({ reviewType, onReviewTypeChange }: any) => {
  const [isChecked, setIsChecked] = useState(!isPerfReviewType(reviewType));

  const handleReviewTypeChange = (checked: boolean) => {
    setIsChecked(checked);
    if (checked) {
      onReviewTypeChange(ReviewType.selfReview);
    } else {
      onReviewTypeChange(ReviewType.perfReview);
    }
  };

  return (
    <div className="relative">
      <div 
        className="fixed inset-0"
        style={{
          backgroundImage: `url(${Background.src})`,
          backgroundSize: '400px',
          backgroundPosition: 'center',
          backgroundRepeat: 'repeat',
          opacity: 0.2,
          zIndex: -1,
        }}
      />
      <section className="relative isolate px-6 pt-2 lg:px-8 widget-animate animate in-view">
        <GradientBackground reviewType={reviewType} />
        <div className="mx-auto max-w-6xl pb-12 pt-20">
          <div className="flex flex-col items-center">
            {/* <div className="my-10 flex items-center justify-center md:gap-x-16 gap-x-8">
              <TextButton
                variant={`primary-${
                  isPerfReviewType(reviewType) ? 'perf' : 'self'
                }-review`}
                loading
              >
                Try Now
              </TextButton>
              <TextButton
                variant={`primary-${
                  isPerfReviewType(reviewType) ? 'perf' : 'self'
                }-review`}
              >
                Try Now
              </TextButton>
              <TextButton
                variant={`primary-${
                  isPerfReviewType(reviewType) ? 'perf' : 'self'
                }-review`}
                disabled
              >
                Try Now
              </TextButton>
              <TextButton variant="secondary">Try Now</TextButton>
              <TextButton variant="secondary" disabled>
                Try Now
              </TextButton>
            </div> */}
            <h1 className="text-4xl font-bold text-center text-gray-200 tracking-tight sm:text-5xl">
              Performance Review Assistant
            </h1>
            <p className="mt-6 font-bold leading-8 text-slate-300">
              Voice-First | AI-Powered | Incredibly Simple
            </p>

            <div
              className="mt-12 flex flex-1 items-center max-w-3xl p-0 align-middle gap-4"
              role="tablist"
              aria-orientation="horizontal"
            >
              <span
                className="
                  text-sm
                  font-semibold
                  text-milk"
              >
                {ReviewType.perfReview}
              </span>
              <Switch
                size="xl"
                checked={isChecked}
                onChange={handleReviewTypeChange}
              />
              <span
                className="
                  text-sm
                  font-semibold
                  text-milk"
              >
                {ReviewType.selfReview}
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AppIntro;
