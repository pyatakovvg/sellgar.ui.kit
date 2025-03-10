import React from 'react';

import cn from 'classnames';
import s from './default.module.scss';

export interface IProps {
  color?:
    | 'gray'
    | 'blue'
    | 'green'
    | 'red'
    | 'orange'
    | 'purple'
    | 'white'
    | 'surface'
    | 'white-destructive'
    | 'surface-destructive';
  state?: 'disabled';
  size?: 'lg' | 'md' | 'sm' | 'xs';
  shape?: 'rounded' | 'pill';
  stroke?: boolean;
  disabled?: boolean;
  leadIcon?: React.ReactNode;
  tailIcon?: React.ReactNode;
  label: string | number;
}

export const Badge: React.FC<IProps> = ({
  color = 'gray',
  size = 'md',
  shape = 'rounded',
  stroke,
  disabled,
  label,
  leadIcon,
  tailIcon,
}) => {
  const classNameButton = React.useMemo(
    () =>
      cn(
        s.wrapper,
        {
          [s['color--gray']]: color === 'gray',
          [s['color--blue']]: color === 'blue',
          [s['color--green']]: color === 'green',
          [s['color--orange']]: color === 'orange',
          [s['color--red']]: color === 'red',
          [s['color--purple']]: color === 'purple',
          [s['color--white']]: color === 'white',
          [s['color--surface']]: color === 'surface',
          [s['color--white-destructive']]: color === 'white-destructive',
          [s['color--surface-destructive']]: color === 'surface-destructive',
        },
        {
          [s['size--large']]: size === 'lg',
          [s['size--medium']]: size === 'md',
          [s['size--small']]: size === 'sm',
          [s['size--extra-small']]: size === 'xs',
        },
        {
          [s['shape--rounded']]: shape === 'rounded',
          [s['shape--pill']]: shape === 'pill',
        },
        {
          [s['stroke']]: stroke,
        },
        {
          [s['disabled']]: disabled,
        },
      ),
    [color, size, shape, stroke, disabled],
  );

  return (
    <div className={classNameButton}>
      {leadIcon && <span className={s['lead-icon']}>{leadIcon}</span>}
      <span className={s.label}>{label}</span>
      {tailIcon && <span className={s['tail-icon']}>{tailIcon}</span>}
    </div>
  );
};
