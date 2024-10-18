import CloseIcon from '@assets/icons/close.svg';
import InfoIcon from '@assets/icons/information-circle.svg';
import SuccessIcon from '@assets/icons/check-circle.svg';
import AlertIcon from '@assets/icons/exclamation-circle.svg';
import DangerIcon from '@assets/icons/x-circle.svg';
import { buildClassNames } from 'src/utils/classnames';
import { SvgIcon } from '../svg-icon/svg-icon';
import { IconButton } from '../button/icon-button';

export type FlashMessageType = 'info' | 'success' | 'warning' | 'danger';

export interface FlashMessage {
  id: string;
  type: FlashMessageType;
  hasHtml?: boolean;
  message: string;
  showCloseBtn?: boolean;
  autoClose?: boolean;
  timeout?: number;
}

export interface FlashMessageComponentProps extends FlashMessage {
  onClose?: (id: string) => void;
}

const MESSAGE_CONFIG = {
  info: {
    wrapperClasses: 'border-t-azure',
    icon: InfoIcon,
    iconClasses: 'text-azure',
  },
  success: {
    wrapperClasses: 'border-t-jungle',
    icon: SuccessIcon,
    iconClasses: 'text-jungle',
  },
  warning: {
    wrapperClasses: 'border-t-casablanca-500',
    icon: AlertIcon,
    iconClasses: 'text-casablanca-500',
  },
  danger: {
    wrapperClasses: 'border-t-persimmon',
    icon: DangerIcon,
    iconClasses: 'text-persimmon',
  },
};

export const FlashMessageComponent = (props: FlashMessageComponentProps) => {
  const defaultClasses =
    'mt-4 p-4 pt-3 bg-zinc-800 shadow-2xl border-t-4 rounded flex items-start space-x-1 w-[400px] animate-[flash-message-entry_0.5s_ease_1]';
  const { id, type, showCloseBtn = true, message, hasHtml } = props;
  const { wrapperClasses, icon, iconClasses } = MESSAGE_CONFIG[type];
  const wrapperClassNames = buildClassNames(defaultClasses, wrapperClasses);

  return (
    <div
      className={wrapperClassNames}
      id={`flash-message-${id}`}
      data-testid="flash-message"
      data-type={type}
    >
      <SvgIcon
        svg={icon}
        className={buildClassNames('me-2 mt-[3px]', iconClasses)}
      />
      {hasHtml ? (
        <div
          className="flex-grow leading-5"
          dangerouslySetInnerHTML={{
            __html: message,
          }}
        ></div>
      ) : (
        <div className="flex-grow leading-5">{message}</div>
      )}
      {showCloseBtn && (
        <IconButton
          data-testid="close-flash-message"
          aria-label="Close"
          size="sm"
          onClick={() => props.onClose?.(id)}
        >
          <SvgIcon svg={CloseIcon} size="sm" />
        </IconButton>
      )}
    </div>
  );
};
