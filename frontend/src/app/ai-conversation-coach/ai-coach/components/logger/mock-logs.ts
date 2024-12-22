/**
 * this module is just mock data, intended to make it easier to develop and style the logger
 */
import type { StreamingLog } from "../../../../../types/multimodal-live-types";

const soundLogs = (n: number): StreamingLog[] =>
  new Array(n).fill(0).map(
    (): StreamingLog => ({
      date: new Date(),
      type: "server.audio",
      message: "buffer (11250)",
    }),
  );
//
const realtimeLogs = (n: number): StreamingLog[] =>
  new Array(n).fill(0).map(
    (): StreamingLog => ({
      date: new Date(),
      type: "client.realtimeInput",
      message: "audio",
    }),
  );

export const mockLogs: StreamingLog[] = [
  {
    date: new Date(),
    type: "client.open",
    message: "connected to socket",
  },
  ...realtimeLogs(10),
  ...soundLogs(10),
  {
    date: new Date(),
    type: "receive.content",
    message: {
      serverContent: {
        interrupted: true,
      },
    },
  },
  {
    date: new Date(),
    type: "receive.content",
    message: {
      serverContent: {
        turnComplete: true,
      },
    },
  },
  //this one is just a string
  // {
  //   date: new Date(),
  //   type: "server.send",
  //   message: {
  //     serverContent: {
  //       turnComplete: true,
  //     },
  //   },
  // },
  ...realtimeLogs(10),
  ...soundLogs(20),
  {
    date: new Date(),
    type: "receive.content",
    message: {
      serverContent: {
        modelTurn: {
          parts: [{ text: "Hey its text" }, { text: "more" }],
        },
      },
    },
  },
  {
    date: new Date(),
    type: "client.send",
    message: {
      clientContent: {
        turns: [
          {
            role: "User",
            parts: [
              {
                text: "How much wood could a woodchuck chuck if a woodchuck could chuck wood",
              },
            ],
          },
        ],
        turnComplete: true,
      },
    },
  },
  {
    date: new Date(),
    type: "server.toolCall",
    message: {
      toolCall: {
        functionCalls: [
          {
            id: "akadjlasdfla-askls",
            name: "take_photo",
            args: {},
          },
          {
            id: "akldjsjskldsj-102",
            name: "move_camera",
            args: { x: 20, y: 4 },
          },
        ],
      },
    },
  },
  {
    date: new Date(),
    type: "server.toolCallCancellation",
    message: {
      toolCallCancellation: {
        ids: ["akladfjadslfk", "adkafsdljfsdk"],
      },
    },
  },
  {
    date: new Date(),
    type: "client.toolResponse",
    message: {
      toolResponse: {
        functionResponses: [
          {
            response: { success: true },
            id: "akslaj-10102",
          },
        ],
      },
    },
  },
];
