import React from 'react';

import { Typography, Badge, Toggle } from '../../symbols';

import cn from 'classnames';
import s from './default.module.scss';

interface IProps {
  leadIcon?: React.ReactNode;
  active?: boolean;
  label: string;
  badge?: string;
  toggle?: boolean;
}

export const BaseOption: React.FC<IProps> = (props) => {
  const className = React.useMemo(
    () =>
      cn(s.wrapper, {
        [s.active]: props.active,
      }),
    [props.active],
  );

  return (
    <div className={className}>
      {props.leadIcon && <div className={s['lead-icon']}>{props.leadIcon}</div>}
      <div className={s.label}>
        <Typography size={'caption-l'} weight={'medium'}>
          <p className={s.text}>{props.label}</p>
        </Typography>
      </div>
      {props.badge && (
        <div className={s.badge}>
          <Badge color={'gray'} label={props.badge} size={'xs'} />
        </div>
      )}
      {props.toggle !== undefined && (
        <div className={s.badge}>
          <Toggle size={'sm'} checked={props.toggle} />
        </div>
      )}
    </div>
  );
};
