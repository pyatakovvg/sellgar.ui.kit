import React from 'react';

import { Icon, type TIconName } from '../icon';

import cn from 'classnames';
import s from './default.module.scss';

interface IProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'style'> {
  style: 'primary' | 'secondary' | 'tertiary' | 'ghost';
  size: 'lg' | 'md' | 'sm' | 'xs';
  target?: 'destructive';
  shape?: 'rounded' | 'pill';
  icon: TIconName;
}

export const ButtonIcon: React.FC<IProps> = ({
  size = 'md',
  style = 'primary',
  shape = 'rounded',
  target,
  icon,
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
      <div className={s['lead-icon']}>
        <Icon icon={icon} />
      </div>
    </button>
  );
};
