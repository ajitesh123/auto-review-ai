'use client';

import React, { useRef, useState } from 'react';
import { LiveAPIProvider } from '@contexts/LiveAPIContext';
import ControlTray from './components/ControlTray';
import RepeatBackground from '@components/RepeatBackground';
import TemplateCard from './components/TemplateCard';
import { motion } from 'framer-motion';

const API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY as string;
if (typeof API_KEY !== 'string') {
  throw new Error('set REACT_APP_GEMINI_API_KEY in .env');
}

const host = 'generativelanguage.googleapis.com';
const uri = `wss://${host}/ws/google.ai.generativelanguage.v1alpha.GenerativeService.BidiGenerateContent`;

const templates = [
  {
    id: 1,
    title: 'Mock Interview',
    description:
      'Perfect for learning how the framework works, prototyping a new idea, or creating a demo to share online.',
  },
  {
    id: 2,
    title: 'Performance Review',
    description: 'Perfect for practicing feedback on your performance.',
  },
  {
    id: 3,
    title: 'Sales Pitch',
    description: 'Perfect for practicing a sales pitch.',
  },
  {
    id: 4,
    title: 'Business Pitch',
    description: 'Perfect for practicing a business pitch.',
  },
];

export default function VoiceAI() {
  // this video reference is used for displaying the active stream, whether that is the webcam or screen capture
  // feel free to style as you see fit
  const videoRef = useRef<HTMLVideoElement>(null);
  // either the screen capture, the video or null, if null we hide it
  const [videoStream, setVideoStream] = useState<MediaStream | null>(null);

  const onClickTemplate = (template: any) => {
    console.log('clicked template', template);
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
          className="flex flex-col overflow-y-auto max-w-6xl mx-auto p-4 items-center justify-center"
          role="tablist"
          aria-orientation="horizontal"
        >
          <LiveAPIProvider url={uri} apiKey={API_KEY}>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {templates.map((template, i) => (
                <TemplateCard
                  key={i}
                  template={template}
                  onClick={onClickTemplate}
                />
              ))}
            </div>

            <ControlTray
              videoRef={videoRef}
              supportsVideo={true}
              onVideoStreamChange={setVideoStream}
            >
              {/* put your own buttons here */}
            </ControlTray>
          </LiveAPIProvider>
        </motion.div>
      </div>
    </div>
  );
}
