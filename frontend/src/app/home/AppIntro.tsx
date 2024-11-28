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
      <section className="relative isolate px-6 pt-12 lg:px-8">
        <GradientBackground reviewType={reviewType} />
        <div className="mx-auto max-w-7xl pb-16 pt-32">
          <div className="flex flex-col items-center">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-5xl font-bold text-center text-gray-200 tracking-tight sm:text-7xl animate-float"
            >
              <span className="bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text animate-gradient">AI Performance Review</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-8 text-xl font-bold leading-8 text-slate-300"
            >
              Voice-First | AI-Powered | Incredibly Simple
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-16 flex flex-1 items-center max-w-4xl p-0 align-middle gap-6"
              role="tablist"
              aria-orientation="horizontal"
            >
              <motion.span
                whileHover={{ scale: 1.05 }}
                className="text-sm font-semibold text-milk"
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
                className="text-sm font-semibold text-milk"
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
