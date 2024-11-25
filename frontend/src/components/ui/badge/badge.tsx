import { HTMLAttributes, forwardRef } from 'react';
import { buildClassNames } from 'src/utils/classnames';

type Variant = 'normal' | 'blue' | 'red' | 'green' | 'yellow' | 'grey';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: Variant;
}

const colorConfigs: Record<Variant, string> = {
  normal: 'text-elephant border-smoke-100 bg-milk',
  blue: 'text-azure-800 border-azure-100 bg-azure-50',
  red: 'text-persimmon-900 border-persimmon-100 bg-persimmon-50',
  green: 'text-jungle-800 border-jungle-100 bg-jungle-50',
  yellow: 'text-casablanca-900 border-casablanca-100 bg-casablanca-50',
  grey: 'text-smoke-800 border-smoke-100 bg-smoke',
};

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(function Badge(
  { children, className, variant = 'normal', ...rest },
  ref,
) {
  const badgeClasses = buildClassNames(
    'border border-solid px-2 py-1 font-semibold rounded leading-5 text-xs',
    colorConfigs[variant],
    className,
  );
  return (
    <span
      data-testid={`badge-${variant}`}
      {...rest}
      className={badgeClasses}
      ref={ref}
    >
      {children}
    </span>
  );
});
