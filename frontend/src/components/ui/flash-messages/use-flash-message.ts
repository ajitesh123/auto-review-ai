import { useContext } from 'react';
import { FlashMessage } from './flash-message';
import { FlashMessagesDispatchContext } from './flash-messages.context';

let nextId = 1;

export const useFlashMessage = () => {
  const dispatch = useContext(FlashMessagesDispatchContext);

  const addFlashMessage = (flashMessage: Partial<FlashMessage>) => {
    const message: FlashMessage = Object.assign<
      FlashMessage,
      Partial<FlashMessage>
    >(
      {
        id: (nextId++).toString(),
        type: 'info',
        showCloseBtn: true,
        autoClose: true,
        message: '',
        timeout: 5000,
      },
      flashMessage
    );
    dispatch?.({ type: 'add', message });
    if (message.autoClose && message.timeout) {
      setTimeout(() => removeFlashMessage(message.id), message.timeout);
    }
  };

  const removeFlashMessage = (id: string) => {
    dispatch?.({ type: 'remove', id });
  };

  const addInfoMessage = (message: Partial<FlashMessage>) =>
    addFlashMessage(Object.assign({ type: 'info' }, message));

  const addSuccessMessage = (message: Partial<FlashMessage>) =>
    addFlashMessage(Object.assign({ type: 'success' }, message));

  const addWarningMessage = (message: Partial<FlashMessage>) =>
    addFlashMessage(Object.assign({ type: 'warning' }, message));

  const addFailureMessage = (message: Partial<FlashMessage>) =>
    addFlashMessage(Object.assign({ type: 'danger' }, message));

  return {
    addInfoMessage,
    addSuccessMessage,
    addWarningMessage,
    addFailureMessage,
  };
};
