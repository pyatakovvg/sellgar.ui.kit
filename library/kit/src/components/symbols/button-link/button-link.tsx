import React from 'react';

import { Icon, type TIconName } from '../icon';

import cn from 'classnames';
import s from './default.module.scss';

interface IProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'style'> {
  form?: 'icon-only';
  style?: 'primary' | 'secondary' | 'tertiary' | 'ghost';
  size?: 'md' | 'sm';
  target?: 'destructive';
  shape?: 'rounded' | 'pill';
  leadicon?: TIconName;
  tailicon?: TIconName;
  label?: string | number;
}

export const ButtonLink: React.FC<IProps> = ({
  size = 'md',
  style = 'primary',
  shape = 'rounded',
  target,
  leadicon,
  tailicon,
  label,
  ...props
}) => {
  const classNameButton = React.useMemo(
    () =>
      cn(
        s.wrapper,
        {
          [s['size--md']]: size === 'md',
          [s['size--sm']]: size === 'sm',
        },
        {
          [s['target--destructive']]: target === 'destructive',
        },
      ),
    [size, style, target, shape],
  );

  return (
    <button {...props} className={classNameButton}>
      {leadicon && (
        <div className={s['lead-icon']}>
          <Icon icon={leadicon} />
        </div>
      )}
      <div className={s.text}>{props.children}</div>
      {label && (
        <div className={s.badge}>
          <span className={s.label}>{label}</span>
        </div>
      )}
      {tailicon && (
        <div className={s['tail-icon']}>
          <Icon icon={tailicon} />
        </div>
      )}
    </button>
  );
};
