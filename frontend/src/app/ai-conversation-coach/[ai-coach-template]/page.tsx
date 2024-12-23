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
    <div className="flex flex-col min-h-screen">
      <div className="relative">
        <RepeatBackground />
        <aside className="fixed md:relative w-64 h-full">
          <Sidebar />
        </aside>
        <div className="flex flex-col items-center justify-center h-full">
          <div className="flex flex-col">
            {selectedTemplate?.name}
            <p>{selectedTemplate?.description}</p>
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
