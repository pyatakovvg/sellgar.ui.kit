import React from 'react';

import { Badge } from '../../badge';

import cn from 'classnames';
import s from './default.module.scss';
import { Icon } from '../../icon';

export interface IProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'className'> {
  ref?: React.RefCallback<HTMLInputElement>;
  leadIcon?: React.ReactNode;
  tailIcon?: React.ReactNode;
  badge?: string | number;
  size?: 'xs' | 'md';
  target?: 'destructive';
  isFocused?: boolean;
  isClearable?: boolean;
  onClear?(): void;
}

export const Input: React.FC<React.PropsWithChildren<IProps>> = ({
  children,
  size = 'md',
  target,
  leadIcon,
  tailIcon,
  badge,
  isFocused,
  isClearable,
  disabled,
  onClear,
}) => {
  const className = React.useMemo(
    () =>
      cn(
        s.wrapper,
        {
          [s['focused']]: isFocused,
        },
        {
          [s['size--medium']]: size === 'md',
          [s['size--extra-small']]: size === 'xs',
        },
        {
          [s['disabled']]: disabled,
        },
        {
          [s['destructive']]: target === 'destructive',
        },
      ),
    [isFocused, size, target, disabled],
  );

  const handleClearable = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();

    onClear && onClear();
  };

  return (
    <div className={className}>
      {leadIcon && <div className={s['lead-icon']}>{leadIcon}</div>}
      <div className={s.content}>{children}</div>
      {badge && (
        <div className={s.badge}>
          <Badge size={'sm'} color={'gray'} label={badge} disabled={disabled} />
        </div>
      )}
      {tailIcon && <div className={s['tail-icon']}>{tailIcon}</div>}
      {isClearable && (
        <div className={s.clearable} onClick={handleClearable}>
          <Icon icon={'close-line'} />
        </div>
      )}
      <div className={s.arrow}>
        <Icon icon={isFocused ? 'arrow-drop-up-line' : 'arrow-drop-down-line'} />
      </div>
    </div>
  );
};
