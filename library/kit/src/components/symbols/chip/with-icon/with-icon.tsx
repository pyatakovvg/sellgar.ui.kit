import React from 'react';

import { Icon, type TIconName } from '../../icon';

import cn from 'classnames';
import s from './default.module.scss';

export interface IProps {
  type?: 'icon';
  size?: 'lg' | 'md' | 'sm';
  shape?: 'rounded' | 'pill';
  isActive?: boolean;
  disabled?: boolean;
  leadIcon?: TIconName;
  label: string | number;
}

export const WithIcon: React.FC<IProps> = ({
  size = 'md',
  shape = 'rounded',
  disabled,
  isActive = false,
  label,
  leadIcon,
}) => {
  const classNameButton = React.useMemo(
    () =>
      cn(
        s.wrapper,
        {
          [s['size--lg']]: size === 'lg',
          [s['size--md']]: size === 'md',
          [s['size--sm']]: size === 'sm',
        },
        {
          [s['shape--pill']]: shape === 'pill',
          [s['shape--rounded']]: shape === 'rounded',
        },
        {
          [s['active']]: isActive,
        },
        {
          [s['disabled']]: disabled,
        },
      ),
    [size, shape, disabled, isActive],
  );

  return (
    <div className={classNameButton}>
      {leadIcon && (
        <div className={s['lead-icon']}>
          <Icon icon={leadIcon} />
        </div>
      )}
      <span className={s.label}>{label}</span>
      {isActive && (
        <div className={s.close}>
          <Icon icon={'close-line'} />
        </div>
      )}
    </div>
  );
};
