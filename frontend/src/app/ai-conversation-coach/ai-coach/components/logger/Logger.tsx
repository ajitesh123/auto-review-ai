import { Part } from "@google/generative-ai";
import cn from "classnames";
import { ReactNode } from "react";
import { useLoggerStore } from "../../../../../voice-ai-lib/store-logger";
import {
  ClientContentMessage,
  isClientContentMessage,
  isInterrupted,
  isModelTurn,
  isServerContentMessage,
  isToolCallCancellationMessage,
  isToolCallMessage,
  isToolResponseMessage,
  isTurnComplete,
  ModelTurn,
  ServerContentMessage,
  StreamingLog,
  ToolCallCancellationMessage,
  ToolCallMessage,
  ToolResponseMessage,
} from "../../../../../types/multimodal-live-types";

// =============== Types ===============

export type LoggerFilterType = "conversations" | "tools" | "none";
export type LoggerProps = { filter: LoggerFilterType };
type Message = { message: StreamingLog["message"] };

// Add new type definitions
type UserFriendlyMessages = {
  [key: string]: string | null;
};

// Add message mappings
const userFriendlyMessages: UserFriendlyMessages = {
  'client.realtimeInput': 'Processing your input...',
  'server.audio': null, // Hide audio buffer messages
  'client.close': 'Disconnecting...',
  'server.close': 'Session ended',
  'client.open': 'Connected',
  'client.send': 'Sending message...',
  'server.send': null,
  'receive.content': null, // Handle separately in resolveMessageComponent
};

// =============== Utilities ===============

/**
 * Formats a date object to HH:mm time string
 */
const formatTime = (d: Date): string => d.toLocaleTimeString().slice(0, -3);

/**
 * Filter functions for different logger modes
 */
const filters: Record<LoggerFilterType, (log: StreamingLog) => boolean> = {
  tools: (log: StreamingLog) =>
    isToolCallMessage(log.message) ||
    isToolResponseMessage(log.message) ||
    isToolCallCancellationMessage(log.message),
  conversations: (log: StreamingLog) =>
    isClientContentMessage(log.message) || isServerContentMessage(log.message),
  none: () => true,
};

// =============== Base Components ===============

/**
 * Renders a plain text message
 */
const PlainTextMessage = ({ message }: Message): JSX.Element => 
  <span>{message as string}</span>;

/**
 * Renders any message as formatted JSON
 */
const AnyMessage = ({ message }: Message): JSX.Element => 
  <pre>{JSON.stringify(message, null, "  ")}</pre>;

/**
 * Creates a plain text message component with predefined text
 */
const CustomPlainTextLog = (msg: string) => () => 
  <PlainTextMessage message={msg} />;

// =============== Content Rendering Components ===============

/**
 * Renders a single part of a message (text or inline data)
 */
const RenderPart = ({ part }: { part: Part }): JSX.Element =>
  part.text && part.text.length ? (
    <p className="bg-neutral-5 p-2 mb-0.5 rounded-md text-neutral-90 text-xs">
      {part.text}
    </p>
  ) : (
    <div className="bg-neutral-5 p-2 mb-0.5 rounded-md">
      <h5 className="text-xs m-0 pb-1 border-b border-neutral-20">
        Inline Data: {part.inlineData?.mimeType}
      </h5>
    </div>
  );

/**
 * Renders client/user messages
 */
const ClientContentLog = ({ message }: Message): JSX.Element => {
  const { turns, turnComplete } = (message as ClientContentMessage).clientContent;
  return (
    <div className="bg-neutral-5 p-2 rounded-md my-1 border-l-2 border-green-500">
      <h4 className="text-green-500 text-xs uppercase py-1 m-0">User</h4>
      {turns.map((turn, i) => (
        <div key={`message-turn-${i}`}>
          {turn.parts
            .filter((part) => !(part.text && part.text === "\n"))
            .map((part, j) => (
              <RenderPart part={part} key={`message-turn-${i}-part-${j}`} />
            ))}
        </div>
      ))}
      {!turnComplete && <span>turnComplete: false</span>}
    </div>
  );
};

/**
 * Renders tool call messages
 */
const ToolCallLog = ({ message }: Message): JSX.Element => {
  const { toolCall } = message as ToolCallMessage;
  return (
    <div className="bg-neutral-5 p-2 rounded-md my-1 border-l-2 border-purple-500">
      {toolCall.functionCalls.map((fc) => (
        <div key={fc.id} className="bg-neutral-5 p-2 mb-0.5 rounded-md border-l-2 border-purple-500">
          <h5 className="text-purple-500 text-xs m-0 pb-1 border-b border-neutral-20">
            Function call: {fc.name}
          </h5>
          <pre className="overflow-x-auto text-xs my-0 py-1">{JSON.stringify(fc, null, "  ")}</pre>
        </div>
      ))}
    </div>
  );
};

/**
 * Renders tool call cancellation messages
 */
const ToolCallCancellationLog = ({ message }: Message): JSX.Element => (
  <div className={cn("rich-log tool-call-cancellation")}>
    <span>
      ids:{" "}
      {(message as ToolCallCancellationMessage).toolCallCancellation.ids.map(
        (id) => (
          <span className="inline-code" key={`cancel-${id}`}>
            "{id}"
          </span>
        ),
      )}
    </span>
  </div>
);

/**
 * Renders tool response messages
 */
const ToolResponseLog = ({ message }: Message): JSX.Element => (
  <div className={cn("rich-log tool-response")}>
    {(message as ToolResponseMessage).toolResponse.functionResponses.map(
      (fc) => (
        <div key={`tool-response-${fc.id}`} className="part">
          <h5>Function Response: {fc.id}</h5>
          <pre>{JSON.stringify(fc.response, null, "  ")}</pre>
        </div>
      ),
    )}
  </div>
);

/**
 * Renders model response messages
 */
const ModelTurnLog = ({ message }: Message): JSX.Element => {
  const serverContent = (message as ServerContentMessage).serverContent;
  const { modelTurn } = serverContent as ModelTurn;
  const { parts } = modelTurn;

  return (
    <div className="bg-neutral-5 p-2 rounded-md my-1 border-l-2 border-blue-500">
      <h4 className="text-blue-500 text-xs uppercase py-1 m-0">Model</h4>
      {parts
        .filter((part) => !(part.text && part.text === "\n"))
        .map((part, j) => (
          <RenderPart part={part} key={`model-turn-part-${j}`} />
        ))}
    </div>
  );
};

// =============== Message Type Resolution ===============

/**
 * Determines the appropriate component to render based on message type
 */
const resolveMessageComponent = (log: StreamingLog) => {
  if (typeof log.message === "string") return PlainTextMessage;
  if (isClientContentMessage(log.message)) return ClientContentLog;
  if (isToolCallMessage(log.message)) return ToolCallLog;
  if (isToolCallCancellationMessage(log.message)) return ToolCallCancellationLog;
  if (isToolResponseMessage(log.message)) return ToolResponseLog;
  
  if (isServerContentMessage(log.message)) {
    const { serverContent } = log.message;
    if (isInterrupted(serverContent)) return CustomPlainTextLog("interrupted");
    if (isTurnComplete(serverContent)) return CustomPlainTextLog("turnComplete");
    if (isModelTurn(serverContent)) return ModelTurnLog;
  }
  
  return AnyMessage;
};

// =============== Main Components ===============

/**
 * Renders a single log entry with timestamp and message
 */
const LogEntry = ({
  log,
  MessageComponent,
}: {
  log: StreamingLog;
  MessageComponent: ({ message }: { message: StreamingLog["message"] }) => ReactNode;
}): JSX.Element | null => {
  const friendlyMessage = userFriendlyMessages[log.type];
  if (friendlyMessage === null) return null;

  const messageColor = log.type.startsWith('client') ? 'text-green-500' : 'text-blue-500';

  return (
    <li className="block py-1 font-mono text-xs font-normal whitespace-nowrap">
      <div className="flex items-baseline space-x-0">
        <span className="w-[60px] flex-shrink-0 opacity-70 text-neutral-50">
          {formatTime(log.date)}
        </span>
        <span className={cn('flex-grow truncate', messageColor)}>
          {friendlyMessage || <MessageComponent message={log.message} />}
        </span>
      </div>
    </li>
  );
};

/**
 * Main Logger component that displays filtered logs
 */
export default function Logger({ filter = "none" }: LoggerProps): JSX.Element {
  const { logs } = useLoggerStore();
  const filterFn = filters[filter];

  return (
    <div className="w-full text-xs font-mono text-gray-300">
      <ul className="pl-5 overflow-x-hidden">
        {logs.filter(filterFn).map((log, key) => (
          <LogEntry 
            MessageComponent={resolveMessageComponent(log)} 
            log={log} 
            key={key} 
          />
        ))}
      </ul>
    </div>
  );
}
