import React from 'react';

import { Badge } from '../badge';
import { Icon, type TIconName } from '../icon';

import cn from 'classnames';
import s from './default.module.scss';

export interface IProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'className'> {
  leadicon?: TIconName;
  tailicon?: TIconName;
  badge?: string | number;
  size: 'xs' | 'md';
  target?: 'destructive';
}

export const Input: React.FC<IProps> = ({ size = 'md', target, leadicon, tailicon, badge, ...props }) => {
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

  const handleFocus = () => {
    setFocused(true);
  };

  const handleBlur = () => {
    setFocused(false);
  };

  return (
    <div className={classNameButton}>
      {leadicon && (
        <div className={s['lead-icon']}>
          <Icon icon={leadicon} />
        </div>
      )}
      <div className={s.content}>
        <input {...props} className={s.input} onFocus={handleFocus} onBlur={handleBlur} />
      </div>
      {badge && (
        <div className={s.badge}>
          <Badge size={'sm'} color={'gray'} label={badge} disabled={props.disabled} />
        </div>
      )}
      {tailicon && (
        <div className={s['tail-icon']}>
          <Icon icon={tailicon} />
        </div>
      )}
    </div>
  );
};
