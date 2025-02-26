import React from 'react';

import { Icon } from '../icon';
import { Dot } from '../../misc';

import cn from 'classnames';
import s from './default.module.scss';

interface IProps {
  size?: '2xl' | 'xl' | 'lg' | 'md' | 'sm' | 'xs';
  color?: 'gray' | 'green' | 'blue' | 'orange' | 'red' | 'purple';
  isStatus?: boolean;
  isNotification?: boolean;
}

export const Avatar: React.FC<IProps> = ({ size = '2xl', color = 'gray', ...props }) => {
  const className = React.useMemo(
    () =>
      cn(
        s.wrapper,
        {
          [s['size--2xl']]: size === '2xl',
          [s['size--xl']]: size === 'xl',
          [s['size--lg']]: size === 'lg',
          [s['size--md']]: size === 'md',
          [s['size--sm']]: size === 'sm',
          [s['size--xs']]: size === 'xs',
        },
        {
          [s['color--gray']]: color === 'gray',
          [s['color--green']]: color === 'green',
          [s['color--blue']]: color === 'blue',
          [s['color--orange']]: color === 'orange',
          [s['color--red']]: color === 'red',
          [s['color--purple']]: color === 'purple',
        },
      ),
    [size, color],
  );

  return (
    <div className={className}>
      {props.isNotification && (
        <div className={s.notification}>
          <Dot size={size} color={'red'} />
        </div>
      )}
      <div className={s.content}>
        <div className={s.icon}>
          <Icon icon={'user-3-line'} />
        </div>
      </div>
      {props.isStatus && (
        <div className={s.status}>
          <Dot size={size} color={'green'} />
        </div>
      )}
    </div>
  );
};
