import React from 'react';

import cn from 'classnames';
import s from './default.module.scss';

interface IProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'style'> {
  form?: 'icon-only';
  style?: 'primary' | 'secondary' | 'tertiary' | 'ghost';
  size?: 'md' | 'sm';
  target?: 'destructive';
  shape?: 'rounded' | 'pill';
  leadIcon?: React.ReactNode;
  tailIcon?: React.ReactNode;
  label?: string | number;
}

export const ButtonLink: React.FC<IProps> = ({
  size = 'md',
  style = 'primary',
  shape = 'rounded',
  target,
  leadIcon,
  tailIcon,
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
      {leadIcon && <div className={s['lead-icon']}>{leadIcon}</div>}
      <div className={s.text}>{props.children}</div>
      {label && (
        <div className={s.badge}>
          <span className={s.label}>{label}</span>
        </div>
      )}
      {tailIcon && <div className={s['tail-icon']}>{tailIcon}</div>}
    </button>
  );
};
