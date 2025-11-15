import React from 'react';

import { Badge } from '../badge';

import cn from 'classnames';
import s from './default.module.scss';

export interface IProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'className'> {
  ref?: React.RefObject<HTMLInputElement> | React.RefCallback<HTMLInputElement>;
  leadIcon?: React.ReactNode;
  tailIcon?: React.ReactNode;
  badge?: React.ReactNode;
  size?: 'xs' | 'md';
  target?: 'destructive';
}

export const Input: React.FC<IProps> = ({ ref, size = 'md', target, leadIcon, tailIcon, badge, ...props }) => {
  const [isFocused, setFocused] = React.useState(false);
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

  React.useEffect(() => {
    if (isFocused && props.disabled) {
      setFocused(false);
    }
  }, [props.disabled]);

  const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    setFocused(true);
    props.onFocus && props.onFocus(event);
  };

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    setFocused(false);
    props.onBlur && props.onBlur(event);
  };

  return (
    <div className={classNameButton}>
      {leadIcon && <div className={s['lead-icon']}>{leadIcon}</div>}
      <div className={s.content}>
        <input ref={ref} {...props} className={s.input} onFocus={handleFocus} onBlur={handleBlur} />
      </div>
      {badge && <div className={s.badge}>{badge}</div>}
      {tailIcon && <div className={s['tail-icon']}>{tailIcon}</div>}
    </div>
  );
};
