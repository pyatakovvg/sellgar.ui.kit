import React from 'react';

import { Badge } from '../badge';

import cn from 'classnames';
import s from './default.module.scss';

export interface IProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'className'> {
  ref?: React.RefCallback<HTMLInputElement>;
  leadicon?: React.ReactNode;
  tailicon?: React.ReactNode;
  badge?: string | number;
  size?: 'xs' | 'md';
  target?: 'destructive';
}

export const Input: React.FC<IProps> = ({ ref, size = 'md', target, leadicon, tailicon, badge, ...props }) => {
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
      {leadicon && <div className={s['lead-icon']}>{leadicon}</div>}
      <div className={s.content}>
        <input ref={ref} {...props} className={s.input} onFocus={handleFocus} onBlur={handleBlur} />
      </div>
      {badge && (
        <div className={s.badge}>
          <Badge size={'sm'} color={'gray'} label={badge} disabled={props.disabled} />
        </div>
      )}
      {tailicon && <div className={s['tail-icon']}>{tailicon}</div>}
    </div>
  );
};
