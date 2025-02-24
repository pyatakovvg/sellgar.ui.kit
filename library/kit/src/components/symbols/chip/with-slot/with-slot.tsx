import React from 'react';

import cn from 'classnames';
import s from './default.module.scss';
import { Icon } from '../../icon';

export interface IProps {
  size?: 'lg' | 'md' | 'sm';
  shape?: 'rounded' | 'pill';
  isActive?: boolean;
  disabled?: boolean;
  leadslot?: React.ReactElement;
  label: string | number;
}

export const WithSlot: React.FC<IProps> = ({
  size = 'md',
  shape = 'rounded',
  isActive = false,
  disabled,
  label,
  leadslot,
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
      {leadslot && <div className={s['lead-slot']}>{leadslot}</div>}
      <span className={s.label}>{label}</span>
      {isActive && (
        <div className={s.close}>
          <Icon icon={'close-line'} />
        </div>
      )}
    </div>
  );
};
