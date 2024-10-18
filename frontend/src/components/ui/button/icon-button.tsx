import { forwardRef } from 'react';
import { buildClassNames } from '@utils/classnames';
import { BaseButton, BaseBtnProps } from './base-button';

const sizeConfigs = {
  xs: 'px-0.5',
  sm: 'px-1',
  md: 'px-1.5',
  lg: 'px-2',
};

export interface IconBtnProps extends BaseBtnProps {
  'aria-label': string;
}

export const IconButton = forwardRef<HTMLButtonElement, IconBtnProps>(
  function IconButton(props: IconBtnProps, ref) {
    const { children, className, size = 'md', ...rest } = props;
    return (
      <BaseButton
        {...rest}
        ref={ref}
        size={size}
        className={buildClassNames(sizeConfigs[size], className)}
      >
        <span className="px-1">{children}</span>
      </BaseButton>
    );
  }
);
