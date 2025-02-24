import React from 'react';

import cn from 'classnames';
import s from './default.module.scss';

export interface IProps {
  size?: 'lg' | 'md' | 'sm';
  shape?: 'rounded' | 'pill';
  disabled?: boolean;
  leadslot?: React.ReactElement;
  label: string | number;
}

export const WithSlot: React.FC<IProps> = ({ size = 'md', shape = 'rounded', disabled, label, leadslot }) => {
  const classNameButton = React.useMemo(
    () =>
      cn(
        s.wrapper,
        {
          [s['size--large']]: size === 'lg',
          [s['size--medium']]: size === 'md',
          [s['size--small']]: size === 'sm',
        },
        {
          [s['shape--rounded']]: shape === 'rounded',
          [s['shape--pill']]: shape === 'pill',
        },
        {
          [s['disabled']]: disabled,
        },
      ),
    [size, shape, disabled],
  );

  return (
    <div className={classNameButton}>
      {leadslot && <div className={s['lead-slot']}>{leadslot}</div>}
      <span className={s.label}>{label}</span>
    </div>
  );
};
