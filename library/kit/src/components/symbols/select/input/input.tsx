import React from 'react';

import { Badge } from '../../badge';

import cn from 'classnames';
import s from './default.module.scss';
import { Icon } from '../../icon';

export interface IProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'className'> {
  ref?: React.RefCallback<HTMLInputElement>;
  leadicon?: React.ReactNode;
  tailicon?: React.ReactNode;
  badge?: string | number;
  size?: 'xs' | 'md';
  target?: 'destructive';
  isFocused?: boolean;
}

export const Input: React.FC<React.PropsWithChildren<IProps>> = ({
  ref,
  children,
  size = 'md',
  target,
  leadicon,
  tailicon,
  badge,
  isFocused,
  ...props
}) => {
  const classNameButton = React.useMemo(
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
          [s['disabled']]: props.disabled,
        },
        {
          [s['destructive']]: target === 'destructive',
        },
      ),
    [isFocused, size, target, props.disabled],
  );

  // const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
  //   setFocused(true);
  //   props.onFocus && props.onFocus(event);
  // };
  //
  // const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
  //   setFocused(false);
  //   props.onBlur && props.onBlur(event);
  // };

  return (
    <div className={classNameButton}>
      {leadicon && <div className={s['lead-icon']}>{leadicon}</div>}
      <div className={s.content}>{children}</div>
      {badge && (
        <div className={s.badge}>
          <Badge size={'sm'} color={'gray'} label={badge} disabled={props.disabled} />
        </div>
      )}
      {tailicon && <div className={s['tail-icon']}>{tailicon}</div>}
      <div className={s.arrow}>
        <Icon icon={isFocused ? 'arrow-drop-up-line' : 'arrow-drop-down-line'} />
      </div>
    </div>
  );
};
