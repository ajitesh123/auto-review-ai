'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useLiveAPIContext } from '@contexts/LiveAPIContext';
import ControlTray from './components/ControlTray';
import {
  ConversationTemplate,
  conversationTemplates,
} from '@app/ai-conversation-coach/constants/coach-templates';
import { defaultConfig } from '../constants/coach-config';
import { Sidebar } from './components/sidebar/Sidebar';
import RepeatBackground from '@components/RepeatBackground';
import AudioPulse from './components/audio-pulse/AudioPulse';

// LiveAPI Configuration Types
type SystemInstruction = {
  parts: Array<{ text: string }>;
};

// Configuration sent to Gemini through websocket connection
type GeminiConfig = {
  model: string;
  generationConfig: {
    responseModalities: 'text' | 'audio' | 'image';
    speechConfig: {
      voiceConfig: {
        prebuiltVoiceConfig: {
          voiceName: string;
        };
      };
    };
  };
  systemInstruction: SystemInstruction;
  tools: Array<{ googleSearch: Record<string, never> }>;
};

function AICoachPlayground() {
  // this video reference is used for displaying the active stream, whether that is the webcam or screen capture
  // feel free to style as you see fit
  const videoRef = useRef<HTMLVideoElement>(null);
  // either the screen capture, the video or null, if null we hide it
  const [videoStream, setVideoStream] = useState<MediaStream | null>(null);

  // LiveAPI Context provides websocket connection management:
  // - setConfig: Updates Gemini configuration (model, speech, system instructions)
  // - connected: Boolean indicating if websocket is connected to Gemini
  // - disconnect: Closes websocket connection to Gemini
  // - connect: Establishes new websocket connection with current config
  const { setConfig, connected, disconnect, connect, volume } = useLiveAPIContext();

  // get the template from somewhere
  const templateObject = conversationTemplates[1] as ConversationTemplate;

  // Update Gemini API config when template changes
  useEffect(() => {
    console.log('console useeffect ');
    // Find selected conversation template
    const template = templateObject
      ? conversationTemplates.find((t) => t.id === templateObject.id)
      : null;

    // Create new Gemini configuration:
    // - Uses defaultConfig for model and speech settings
    // - Updates system instructions based on selected template
    // This config will be sent through the websocket connection
    const newConfig: GeminiConfig = {
      ...(defaultConfig as unknown as GeminiConfig), // Cast needed due to type mismatch
      systemInstruction: template
        ? {
            parts: [{ text: template.systemInstruction }],
          }
        : defaultConfig.systemInstruction,
    };

    // Send config through websocket to Gemini API
    setConfig(newConfig);
  }, [setConfig]);

  return (
    <div className="flex flex-col min-h-screen">
      <div className="relative">
        <RepeatBackground />
        <aside className="fixed md:relative w-64 h-full">
          <Sidebar />
        </aside>
        <div className="flex flex-col items-center justify-center h-full">
          <div className='border h-20 w-20 items-center'>
            <AudioPulse volume={volume} active={connected} hover={false} />
          </div>
          <ControlTray
            videoRef={videoRef}
            supportsVideo={true}
            onVideoStreamChange={setVideoStream}
          >
            {/* put your own buttons here */}
          </ControlTray>
        </div>
      </div>
    </div>
  );
}

export default AICoachPlayground;
