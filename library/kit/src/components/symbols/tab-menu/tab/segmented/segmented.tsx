import React from 'react';

import { Typography } from '../../../typography';

import cn from 'classnames';
import s from './default.module.scss';

interface IProps {
  size?: 'lg' | 'md' | 'sm';
  style?: 'primary';
  shape?: 'rounded' | 'pill';
  isActive?: boolean;
  title: string;
  name: string;
  leadIcon?: React.ReactNode;
  tailIcon?: React.ReactNode;
  badge?: React.ReactNode;
  onClick?(): void;
  disabled?: boolean;
}

export const Segmented: React.FC<React.PropsWithChildren<IProps>> = ({
  size = 'lg',
  style = 'primary',
  shape = 'rounded',
  ...props
}) => {
  const className = React.useMemo(
    () =>
      cn(
        s.wrapper,
        {
          [s['size--lg']]: size === 'lg',
          [s['size--md']]: size === 'md',
          [s['size--sm']]: size === 'sm',
        },
        {
          [s['style--primary']]: style === 'primary',
        },
        {
          [s['shape--pill']]: shape === 'pill',
          [s['shape--rounded']]: shape === 'rounded',
        },
        {
          [s.active]: props.isActive,
        },
      ),
    [size, style, shape, props.isActive],
  );

  return (
    <div className={className} role={'tab'} onClick={() => props.onClick && props.onClick()}>
      {props.leadIcon && <div className={s['lead-icon']}>{props.leadIcon}</div>}
      <div className={s.title}>
        <Typography size={size === 'sm' ? 'caption-l' : 'body-s'} weight={'semi-bold'}>
          <span>{props.title}</span>
        </Typography>
      </div>
      {props.badge && <div className={s.badge}>{props.badge}</div>}
      {props.tailIcon && <div className={s['tail-icon']}>{props.tailIcon}</div>}
    </div>
  );
};
