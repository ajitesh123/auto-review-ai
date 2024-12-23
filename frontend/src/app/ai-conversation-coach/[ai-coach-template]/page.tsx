'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useLiveAPIContext } from '@contexts/LiveAPIContext';
import ControlTray from './components/ControlTray';
import { ConversationTemplate } from '@app/ai-conversation-coach/constants/coach-templates';
import { defaultConfig } from '../constants/coach-config';
import { Sidebar } from './components/sidebar/Sidebar';
import RepeatBackground from '@components/RepeatBackground';
import { useAICoachTemplatesStore } from 'src/store/useAICoachTemplatesStore';
import { useParams, useRouter } from 'next/navigation';
import cn from 'classnames';

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
  const router = useRouter();
  const params = useParams();

  // this video reference is used for displaying the active stream, whether that is the webcam or screen capture
  // feel free to style as you see fit
  const videoRef = useRef<HTMLVideoElement>(null);
  // either the screen capture, the video or null, if null we hide it
  const [videoStream, setVideoStream] = useState<MediaStream | null>(null);

  // state to get the selected template
  const [selectedTemplate, setSelectedTemplate] =
    useState<ConversationTemplate | null>(null);

  // LiveAPI Context provides websocket connection management:
  // - setConfig: Updates Gemini configuration (model, speech, system instructions)
  // - connected: Boolean indicating if websocket is connected to Gemini
  // - disconnect: Closes websocket connection to Gemini
  // - connect: Establishes new websocket connection with current config
  const { setConfig, connected, disconnect, connect, volume } =
    useLiveAPIContext();

  // get the template from store
  const { templates } = useAICoachTemplatesStore();
  // const templateObject = templates[1] as ConversationTemplate;

  // Update Gemini API config when template changes
  useEffect(() => {
    // Find selected conversation template
    const selectedTemplateId = params['ai-coach-template'];
    const template = templates.find(
      (t) => t.id === selectedTemplateId
    ) as ConversationTemplate;
    console.log('console template found ', template);
    if (!template) {
      router.push('/ai-conversation-coach');
    }
    setSelectedTemplate(template);

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
    <div className="relative flex h-screen overflow-hidden -mt-[75px]">
      <div className="absolute inset-0 bg-black/70 z-0" />
      <aside className="fixed md:relative w-64 h-full z-20 md:z-10">
        <Sidebar />
      </aside>

      <main className="flex-1 ml-12 md:ml-0 relative z-[1] overflow-hidden flex flex-col">
        <div className="flex-1 overflow-y-auto">
          <RepeatBackground />
          <div className="flex flex-col">
            {selectedTemplate?.name}
            <p>{selectedTemplate?.description}</p>
          </div>

          <video
            className={cn(
              'absolute top-0 right-0 w-[320px] h-[180px] object-cover rounded-lg m-4 z-10',
              'md:w-[320px] md:h-[180px]',
              'sm:w-[240px] sm:h-[135px]',
              { hidden: !videoRef.current || !videoStream }
            )}
            ref={videoRef}
            autoPlay
            playsInline
          />
        </div>

        <div className="flex justify-center pb-4">
          <ControlTray
            videoRef={videoRef}
            supportsVideo={true}
            onVideoStreamChange={setVideoStream}
          />
        </div>
      </main>
    </div>
  );
}

export default AICoachPlayground;
