import React, {
  memo,
  ReactNode,
  RefObject,
  useEffect,
  useRef,
  useState,
} from 'react';
import { ControlButton } from '@components/ui/control-button';
import { useLiveAPIContext } from '@contexts/LiveAPIContext';
import { UseMediaStreamResult } from '@hooks/use-media-stream-mux';
import { useScreenCapture } from '@hooks/use-screen-capture';
import { useWebcam } from '@hooks/use-webcam';
import { AudioRecorder } from 'src/voice-ai-lib/audio-recorder';
import AudioPulse from './audio-pulse/AudioPulse';
import { buildClassNames } from '@utils/classnames';

// ==========================================================================
// Types
// ==========================================================================
export type ControlTrayProps = {
  videoRef: RefObject<HTMLVideoElement>;
  children?: ReactNode;
  supportsVideo: boolean;
  onVideoStreamChange?: (stream: MediaStream | null) => void;
};

type MediaStreamButtonProps = {
  isStreaming: boolean;
  onIcon: string;
  offIcon: string;
  start: () => Promise<any>;
  stop: () => any;
};

// ==========================================================================
// Subcomponents
// ==========================================================================

/**
 * Button used for triggering webcam or screen-capture
 */
export const MediaStreamButton = memo(
  ({ isStreaming, onIcon, offIcon, start, stop }: MediaStreamButtonProps) => (
    <ControlButton onClick={isStreaming ? stop : start}>
      <span className="material-symbols-outlined text-lg transition-transform duration-200 group-hover:scale-110">
        {isStreaming ? onIcon : offIcon}
      </span>
    </ControlButton>
  )
);

/**
 * Button for controlling microphone state
 */
export const MicButton = memo(
  ({ muted, onToggle }: { muted: boolean; onToggle: () => void }) => (
    <ControlButton variant="mic" onClick={onToggle}>
      <span className="material-symbols-outlined filled text-lg">
        {muted ? 'mic_off' : 'mic'}
      </span>
    </ControlButton>
  )
);

/**
 * Button for controlling connection state
 */
type ConnectionButtonProps = {
  connected: boolean;
  onToggle: () => void;
};

export const ConnectionButton = memo(
  React.forwardRef<HTMLButtonElement, ConnectionButtonProps>(
    ({ connected, onToggle }, ref) => {
      const [showTooltip, setShowTooltip] = useState(!connected);

      useEffect(() => {
        if (showTooltip && !connected) {
          const timer = setTimeout(() => {
            setShowTooltip(false);
          }, 1000); // 1 second

          return () => clearTimeout(timer);
        }
      }, [showTooltip, connected]);

      return (
        <div className="relative">
          {showTooltip && (
            <div
              className={buildClassNames(
                'absolute bottom-[calc(100%+15px)] left-1/2 -translate-x-1/2',
                'bg-black text-white p-2 rounded-md',
                'text-sm whitespace-nowrap border border-white',
                'transition-opacity duration-300',
                "after:content-[''] after:absolute after:top-full after:left-1/2",
                'after:-translate-x-1/2 after:border-8 after:border-transparent',
                'after:border-t-[var(--Neutral-80)]',
                'font-mono'
              )}
            >
              Click to start the conversation
            </div>
          )}
          <ControlButton
            ref={ref}
            variant={connected ? 'default' : 'play'}
            onClick={() => {
              onToggle();
              setShowTooltip(false);
            }}
            onMouseEnter={() => !connected && setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
            className={buildClassNames(
              'material-symbols-outlined filled text-lg',
              connected
                ? 'bg-[var(--Blue-500)] text-[var(--Neutral-5)]'
                : undefined
            )}
          >
            <span className="material-symbols-outlined filled text-lg">
              {connected ? 'pause' : 'play_arrow'}
            </span>
          </ControlButton>
        </div>
      );
    }
  )
);

// ==========================================================================
// Main Component
// ==========================================================================

/**
 * ControlTray Component
 * Provides a UI for controlling video/audio streams and connection state
 */
export default function ControlTray({
  videoRef,
  children,
  onVideoStreamChange = () => {},
  supportsVideo,
}: ControlTrayProps) {
  // ==========================================================================
  // State & Refs
  // ==========================================================================
  const videoStreams = [useWebcam(), useScreenCapture()];
  const [activeVideoStream, setActiveVideoStream] =
    useState<MediaStream | null>(null);
  const [webcam, screenCapture] = videoStreams;
  const [inVolume, setInVolume] = useState(0);
  const [audioRecorder] = useState(() => new AudioRecorder());
  const [muted, setMuted] = useState(false);
  const renderCanvasRef = useRef<HTMLCanvasElement>(null);
  const connectButtonRef = useRef<HTMLButtonElement>(null);

  const { client, connected, connect, disconnect, volume } =
    useLiveAPIContext();

  // ==========================================================================
  // Effects
  // ==========================================================================

  // Focus connect button when disconnected
  useEffect(() => {
    if (!connected && connectButtonRef.current) {
      connectButtonRef.current.focus();
    }
  }, [connected]);

  // Update volume visualization
  useEffect(() => {
    document.documentElement.style.setProperty(
      '--volume',
      `${Math.max(5, Math.min(inVolume * 200, 8))}px`
    );
  }, [inVolume]);

  // Handle audio recording and streaming
  useEffect(() => {
    const onData = (base64: string) => {
      client.sendRealtimeInput([
        {
          mimeType: 'audio/pcm;rate=16000',
          data: base64,
        },
      ]);
    };

    if (connected && !muted && audioRecorder) {
      audioRecorder.on('data', onData).on('volume', setInVolume).start();
    } else {
      audioRecorder.stop();
    }

    return () => {
      audioRecorder.off('data', onData).off('volume', setInVolume);
    };
  }, [connected, client, muted, audioRecorder]);

  // Handle video stream management
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.srcObject = activeVideoStream;
    }

    let timeoutId = -1;

    function sendVideoFrame() {
      const video = videoRef.current;
      const canvas = renderCanvasRef.current;

      if (!video || !canvas) return;

      const ctx = canvas.getContext('2d')!;
      canvas.width = video.videoWidth * 0.25;
      canvas.height = video.videoHeight * 0.25;

      if (canvas.width + canvas.height > 0) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const base64 = canvas.toDataURL('image/jpeg', 1.0);
        const data = base64.slice(base64.indexOf(',') + 1, Infinity);
        client.sendRealtimeInput([{ mimeType: 'image/jpeg', data }]);
      }

      if (connected) {
        timeoutId = window.setTimeout(sendVideoFrame, 1000 / 0.5);
      }
    }

    if (connected && activeVideoStream !== null) {
      requestAnimationFrame(sendVideoFrame);
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [connected, activeVideoStream, client, videoRef]);

  // ==========================================================================
  // Handlers
  // ==========================================================================

  /**
   * Handles switching between video streams
   */
  const changeStreams = (next?: UseMediaStreamResult) => async () => {
    if (next) {
      const mediaStream = await next.start();
      setActiveVideoStream(mediaStream);
      onVideoStreamChange(mediaStream);
    } else {
      setActiveVideoStream(null);
      onVideoStreamChange(null);
    }

    videoStreams.filter((msr) => msr !== next).forEach((msr) => msr.stop());
  };

  // ==========================================================================
  // Render
  // ==========================================================================
  return (
    <section className="absolute bottom-[50px] left-1/2 -translate-x-1/2 inline-flex justify-center items-start gap-1 pb-[1.5vh]">
      <canvas className="hidden" ref={renderCanvasRef} />

      <nav
        className={buildClassNames(
          'inline-flex gap-6 items-center',
          'bg-[var(--Neutral-5)] border border-white',
          'rounded-[16px] p-2.5',
          'overflow-clip transition-all duration-600 ease-in',
          connected ? undefined : 'opacity-70'
        )}
      >
        <MicButton muted={muted} onToggle={() => setMuted(!muted)} />

        <ControlButton variant="outlined">
          <AudioPulse volume={volume} active={connected} hover={false} />
        </ControlButton>

        {supportsVideo && (
          <>
            <MediaStreamButton
              isStreaming={screenCapture.isStreaming}
              start={changeStreams(screenCapture)}
              stop={changeStreams()}
              onIcon="cancel_presentation"
              offIcon="present_to_all"
            />
            <MediaStreamButton
              isStreaming={webcam.isStreaming}
              start={changeStreams(webcam)}
              stop={changeStreams()}
              onIcon="videocam_off"
              offIcon="videocam"
            />
          </>
        )}
        {children}
      </nav>

      <div className="flex flex-col justify-center items-center gap-1">
        <div
          className={buildClassNames(
            'relative rounded-[14px] border border-[var(--Neutral-30)]',
            'bg-[var(--Neutral-5)] p-2.5',
            ...(!connected
              ? [
                  "after:content-['']",
                  'after:absolute after:-inset-[2px]',
                  'after:rounded-[16px]',
                  'after:bg-[var(--Blue-500)]',
                  'after:opacity-20 after:-z-10',
                  'after:animate-[pulse-attention_2s_infinite]',
                ]
              : [])
          )}
        >
          <ConnectionButton
            ref={connectButtonRef}
            connected={connected}
            onToggle={connected ? disconnect : connect}
          />
        </div>
        <span
          className={buildClassNames(
            'text-[11px] text-[var(--Blue-500)] select-none',
            !connected ? 'opacity-0' : undefined
          )}
        >
          Streaming
        </span>
      </div>
    </section>
  );
}
