import React from 'react';

import cn from 'classnames';
import s from './default.module.scss';

interface IProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'style'> {
  form?: 'icon-only';
  style?: 'primary' | 'secondary' | 'tertiary' | 'ghost';
  size?: 'lg' | 'md' | 'sm' | 'xs';
  target?: 'destructive';
  shape?: 'rounded' | 'pill';
  leadIcon?: React.ReactNode;
  tailIcon?: React.ReactNode;
  label?: string | number;
}

export const Button: React.FC<IProps> = ({
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
          [s['size--large']]: size === 'lg',
          [s['size--medium']]: size === 'md',
          [s['size--small']]: size === 'sm',
          [s['size--extra-small']]: size === 'xs',
        },
        {
          [s['style--primary']]: style === 'primary',
          [s['style--secondary']]: style === 'secondary',
          [s['style--tertiary']]: style === 'tertiary',
          [s['style--ghost']]: style === 'ghost',
        },
        {
          [s['target--destructive']]: target === 'destructive',
        },
        {
          [s['shape--rounded']]: shape === 'rounded',
          [s['shape--pill']]: shape === 'pill',
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
