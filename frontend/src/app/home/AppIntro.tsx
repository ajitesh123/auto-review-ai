import { TextButton } from '@components/ui/button';
import { Switch } from '@components/ui/switch';
import React, { useState } from 'react';
import { ReviewType } from '@constants/common';

const AppIntro = ({ onReviewTypeChange }: any) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleReviewTypeChange = (checked: boolean) => {
    setIsChecked(checked);
    if (checked) {
      onReviewTypeChange(ReviewType.selfReview);
    } else {
      onReviewTypeChange(ReviewType.perfReview);
    }
  };

  return (
    <section className="relative isolate px-6 pt-2 lg:px-8">
      <div
        className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        aria-hidden="true"
      >
        <div
          className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
        ></div>
      </div>
      <div className="mx-auto max-w-6xl pb-12 pt-36 widget-animate animate">
        <div className="flex flex-col items-center">
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

          {/* <div
            className="hidden mt-10 flex max-w-3xl rounded-lg border border-gray-500 p-0"
            role="tablist"
            aria-orientation="horizontal"
          >
            <button
              className="flex
                  items-center
                  rounded-md
                  py-3
                  px-16
                  text-xs
                  font-semibold
                  text-milk
                  bg-violet-500
                  shadow"
              id="headlessui-tabs-tab-:rl:"
              role="tab"
              type="button"
              aria-selected="true"
              tab-index="0"
              data-headlessui-state="selected"
              aria-controls="headlessui-tabs-panel-:rn:"
            >
              Performance Review
            </button>
            <button
              className="flex
                  flex-1
                  w-full
                  items-center 
                  rounded-md
                  py-3
                  px-16
                  text-xs
                  font-semibold
                  hover:bg-neutral-800
                "
              id="headlessui-tabs-tab-:rm:"
              role="tab"
              type="button"
              aria-selected="false"
              tab-index="-1"
              data-headlessui-state=""
              aria-controls="headlessui-tabs-panel-:r4i:"
            >
              Self Review
            </button>
          </div> */}
        </div>
      </div>
    </section>
  );
};

export default AppIntro;
