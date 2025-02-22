import React from 'react';

import { Icon } from '../icon';
import type { TIconName } from '../icon';

import cn from 'classnames';
import s from './default.module.scss';

interface IProps extends React.HTMLAttributes<HTMLButtonElement> {
  form?: 'icon-only';
  mode?: 'primary' | 'secondary' | 'tertiary' | 'ghost';
  size?: 'xxl' | 'xl' | 'md' | 'sm' | 'xs';
  target?: 'destructive';
  shape?: 'rounded' | 'pill';
  leadicon?: TIconName;
  tailicon?: TIconName;
  badge?: string;
}

export const Button: React.FC<IProps> = ({ className, ...props }) => {
  const classNameButton = React.useMemo(
    () =>
      cn(s.wrapper, className, {
        [s['size--extra-large']]: props.size === 'xxl',
        [s['size--large']]: props.size === 'xl',
        [s['size--small']]: props.size === 'sm',
        [s['size--extra-small']]: props.size === 'xs',
      }),
    [className, props.size],
  );

  return (
    <button {...props} className={classNameButton}>
      {props.leadicon && (
        <span className={s['lead-icon']}>
          <Icon icon={props.leadicon} />
        </span>
      )}
      <span className={s.text}>{props.children}</span>
      {props.tailicon && (
        <span className={s['tail-icon']}>
          <Icon icon={props.tailicon} />
        </span>
      )}
    </button>
  );
};
