'use client';

import React, { useRef, useState } from 'react';
import { LiveAPIProvider } from '@contexts/LiveAPIContext';
import ControlTray from '../components/ControlTray';


const API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY as string;
if (typeof API_KEY !== 'string') {
  throw new Error('set REACT_APP_GEMINI_API_KEY in .env');
}

const host = 'generativelanguage.googleapis.com';
const uri = `wss://${host}/ws/google.ai.generativelanguage.v1alpha.GenerativeService.BidiGenerateContent`;

function AICoachPlayground() {

  // this video reference is used for displaying the active stream, whether that is the webcam or screen capture
  // feel free to style as you see fit
  const videoRef = useRef<HTMLVideoElement>(null);
  // either the screen capture, the video or null, if null we hide it
  const [videoStream, setVideoStream] = useState<MediaStream | null>(null);

  return (
    <LiveAPIProvider url={uri} apiKey={API_KEY}>
      <div>

      <h1>AICoachPlayground</h1>
      </div>
      <ControlTray
        videoRef={videoRef}
        supportsVideo={true}
        onVideoStreamChange={setVideoStream}
      >
        {/* put your own buttons here */}
      </ControlTray>
    </LiveAPIProvider>
   
  );
}

export default AICoachPlayground;
