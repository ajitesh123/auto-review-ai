'use client';

import { Dispatch, PropsWithChildren, createContext, useReducer } from 'react';
import { FlashMessage } from './flash-message';
import { FlashMessages } from './flash-messages';

const FlashMessagesContext = createContext<FlashMessage[]>([]);

export const FlashMessagesDispatchContext = createContext<Dispatch<any> | null>(
  null
);

const messagesReducer = (
  messages: FlashMessage[],
  action: { type: 'add' | 'remove'; [x: string]: any }
) => {
  switch (action.type) {
    case 'add':
      return [...messages, action.message];
    case 'remove':
      return messages.filter((message) => message.id !== action.id);
  }
};

export const FlashMessagesProvider = ({ children }: PropsWithChildren) => {
  const [messages, dispatch] = useReducer(messagesReducer, []);

  return (
    <>
      <FlashMessages
        flashMessages={messages}
        onClose={(id) => dispatch?.({ type: 'remove', id })}
      />
      <FlashMessagesContext.Provider value={messages}>
        <FlashMessagesDispatchContext.Provider value={dispatch}>
          {children}
        </FlashMessagesDispatchContext.Provider>
      </FlashMessagesContext.Provider>
    </>
  );
};
