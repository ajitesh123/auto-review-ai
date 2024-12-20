'use client';

import React, { useRef, useState } from 'react';
import { LiveAPIProvider } from '@contexts/LiveAPIContext';

const API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY as string;
if (typeof API_KEY !== 'string') {
  throw new Error('set REACT_APP_GEMINI_API_KEY in .env');
}

const host = 'generativelanguage.googleapis.com';
const uri = `wss://${host}/ws/google.ai.generativelanguage.v1alpha.GenerativeService.BidiGenerateContent`;

export default function VoiceAI() {
  // this video reference is used for displaying the active stream, whether that is the webcam or screen capture
  // feel free to style as you see fit
  const videoRef = useRef<HTMLVideoElement>(null);
  // either the screen capture, the video or null, if null we hide it
  const [videoStream, setVideoStream] = useState<MediaStream | null>(null);

  return (
    <div className="flex flex-col overflow-y-auto max-w-7xl mx-auto p-4 items-center justify-center">
      <LiveAPIProvider url={uri} apiKey={API_KEY}>
        <div className="flex flex-col items-start justify-start w-full  gap-2 py-4 my-2">
          <div className="text-2xl font-bold">Voice AI</div>
          <div className="text-sm font-semibold text-[#B4B4B4]">
            This is a sample voice AI page. {API_KEY}
          </div>
        </div>
      </LiveAPIProvider>
    </div>
  );
}
