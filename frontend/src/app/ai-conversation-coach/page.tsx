'use client';

import React from 'react';
import RepeatBackground from '@components/RepeatBackground';
import TemplateCard from './components/TemplateCard';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { conversationTemplates } from '@app/ai-conversation-coach/constants/coach-templates';

export default function AIConversationTemplates() {
  const router = useRouter();

  const onClickTemplate = (template: any) => {
    console.log('clicked template', template);
    router.push(`/ai-conversation-coach/ai-coach`);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="relative">
        <RepeatBackground />
        <section className="relative isolate px-6 lg:px-8 pt-6 lg:py-12">
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
                    from-purple-400 to-pink-600
                    text-transparent
                    bg-clip-text
                    animate-gradient
                  `}
                >
                  AI Conversation Coach
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
            </div>
          </div>
        </section>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="flex flex-col overflow-y-auto max-w-6xl mx-auto p-4 items-center justify-center mb-8"
          role="tablist"
          aria-orientation="horizontal"
        >
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {conversationTemplates.map((template, i) => (
                <TemplateCard
                  key={i}
                  template={template}
                  onClick={onClickTemplate}
                />
              ))}
            </div>
        </motion.div>
      </div>
    </div>
  );
}
