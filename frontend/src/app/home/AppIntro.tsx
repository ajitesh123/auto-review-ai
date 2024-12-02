import { Switch } from '@components/ui/switch';
import React, { useState } from 'react';
import { isPerfReviewType, ReviewType } from '@constants/common';
import { TextButton } from '@components/ui/button';
import GradientBackground from '@components/GradientBackground';
import Background from '@assets/icons/background.png';
import { motion } from 'framer-motion';

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
      <section className="relative isolate px-6 lg:px-8 pt-6 lg:pt-12">
        <GradientBackground reviewType={reviewType} />
        <div className="flex flex-col md:flex-row  mx-auto max-w-7xl py-16">
          <div className="flex flex-col flex-1 items-center m-auto">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-center text-gray-200 tracking-tight animate-float"
            >
              <span
                className={`
                bg-gradient-to-r
                ${
                  reviewType === ReviewType.perfReview
                    ? 'from-purple-400 to-pink-600'
                    : 'from-green-200 to-lime-600'
                }
                text-transparent
                bg-clip-text
                animate-gradient
              `}
              >
                AI Performance Review
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-4 text-sm md:text-md lg:text-lg font-bold leading-8 text-slate-300 text-center"
            >
              Voice-First | AI-Powered | Incredibly Simple
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-10 flex items-center p-0 align-middle gap-6"
              role="tablist"
              aria-orientation="horizontal"
            >
              <motion.span
                whileHover={{ scale: 1.05 }}
                className="text-sm font-semibold text-milk text-right"
              >
                {ReviewType.perfReview}
              </motion.span>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Switch
                  size="xl"
                  checked={isChecked}
                  onChange={handleReviewTypeChange}
                />
              </motion.div>

              <motion.span
                whileHover={{ scale: 1.05 }}
                className="text-sm font-semibold text-milk text-left"
              >
                {ReviewType.selfReview}
              </motion.span>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AppIntro;
