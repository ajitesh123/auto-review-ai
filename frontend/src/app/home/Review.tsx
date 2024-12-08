import PerformanceReview from './components/PerformanceReview';
import SelfReview from './components/SelfReview';
import { ReviewType } from '@constants/common';
import ReviewResults from './components/ReviewResults';
import { useState } from 'react';

const Review = ({
  reviewType,
  paramsWhenKeysNeeded,
  reviewResults,
  onReviewResultsReceived,
}: any) => {
  const [isReviewGenerating, setIsReviewGenerating] = useState<Boolean>(false);

  return (
    <section className="relative isolate widget-animate animate in-view mt-12 px-6 lg:px-8">
      <div className="mx-auto border-2 rounded-lg bg-zinc-900 border-slate-800 w-full lg:max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 h-full items-stretch justify-center">
          <div className="flex flex-1 items-start">
            {/* Performance Review and Self Review */}
            {reviewType === ReviewType.perfReview ? (
              <PerformanceReview
                paramsWhenKeysNeeded={paramsWhenKeysNeeded}
                onReviewResultsReceived={onReviewResultsReceived}
                setIsReviewGenerating={setIsReviewGenerating}
              />
            ) : (
              <SelfReview
                paramsWhenKeysNeeded={paramsWhenKeysNeeded}
                onReviewResultsReceived={onReviewResultsReceived}
                setIsReviewGenerating={setIsReviewGenerating}
              />
            )}
          </div>
          <div className="flex flex-1">
            <ReviewResults
              reviews={reviewResults}
              isReviewGenerating={isReviewGenerating}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Review;
