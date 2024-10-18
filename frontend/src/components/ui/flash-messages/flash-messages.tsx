import React from 'react';
import { FlashMessageComponent, FlashMessage } from './flash-message';

export const FlashMessages = (props: {
  onClose?: (id: string) => void;
  flashMessages: FlashMessage[];
}) => {
  return (
    <div
      data-testid="flash-messages"
      className="fixed right-0 top-0 z-[1000] flex -translate-x-2 lg:-translate-x-5 flex-col"
    >
      {props.flashMessages.map((flashMessage) => (
        <FlashMessageComponent
          key={flashMessage.id}
          id={flashMessage.id}
          type={flashMessage.type}
          hasHtml={flashMessage.hasHtml}
          message={flashMessage.message}
          showCloseBtn={flashMessage.showCloseBtn}
          onClose={props.onClose}
        />
      ))}
    </div>
  );
};
