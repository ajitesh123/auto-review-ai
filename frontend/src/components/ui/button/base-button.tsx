import { ButtonHTMLAttributes, forwardRef } from 'react';
import { Spinner } from '../spinner/spinner';
import { buildClassNames } from '@utils/classnames';

type Variant = 'basic' | 'primary' | 'secondary' | 'destructive' | 'custom';
interface ColorConfig {
  default: string;
  disabled?: string;
}

const colorConfigs: Record<Variant, ColorConfig> = {
  custom: {
    default: '',
  },
  basic: {
    default: '',
  },
  primary: {
    // default:
    //   'border bg-gradient-to-b bg-elephant from-elephant-800 to-elephant border-elephant text-milk',
    // disabled: 'from-smoke-300 to-smoke-400 border-smoke-400',
    default: 'border bg-gradient-to-b bg-violet-500  text-milk',
    disabled: 'from-violet-300 to-violet-400 ',
  },
  secondary: {
    default:
      'border bg-gradient-to-b bg-smoke-25 from-milk to-smoke-25 border-smoke-100 text-elephant',
    disabled: 'bg-smoke bg-none text-smoke-300',
  },
  destructive: {
    default: '',
  },
};

const sizeConfigs = {
  xs: 'min-h-4 h-4',
  sm: 'min-h-6 h-6',
  md: 'min-h-8 h-8',
};

export type ButtonSize = 'md' | 'sm' | 'xs';

export interface BaseBtnProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  size?: ButtonSize;
  variant?: Variant;
}

export const BaseButton = forwardRef<HTMLButtonElement, BaseBtnProps>(
  function Button(props, ref) {
    const {
      size = 'md',
      loading,
      variant = 'basic',
      className,
      children,
      onClick,
      ...rest
    } = props;

    const buttonClasses = buildClassNames(
      'relative rounded outline-none focus-visible:shadow-focus-border',
      colorConfigs[variant].default,
      rest.disabled
        ? `${colorConfigs[variant].disabled || ''} cursor-not-allowed`
        : 'hover:bg-none',
      loading ? 'cursor-progress' : '',
      sizeConfigs[size],
      className
    );

    return (
      <button
        type="button"
        {...rest}
        className={buttonClasses}
        ref={ref}
        onClick={(event) => {
          if (!loading) {
            onClick?.(event);
          }
        }}
      >
        {loading && (
          <span className="absolute-center">
            <Spinner size={size} data-testid="spinner-icon" />
          </span>
        )}
        <div
          data-testid="button-content"
          className={buildClassNames(
            'flex items-center',
            loading ? 'invisible' : 'visible'
          )}
        >
          {children}
        </div>
      </button>
    );
  }
);
