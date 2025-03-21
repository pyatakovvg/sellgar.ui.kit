import React from 'react';

import { Typography } from '../typography';

import cn from 'classnames';
import s from './default.module.scss';

export interface IProps {
  leadIcon?: React.ReactNode;
  caption: string;
  state?: 'default' | 'info' | 'success' | 'destructive';
}

export const CaptionField: React.FC<IProps> = ({ state = 'default', ...props }) => {
  const className = React.useMemo(
    () =>
      cn(s.wrapper, {
        [s['state--default']]: state === 'default',
        [s['state--info']]: state === 'info',
        [s['state--success']]: state === 'success',
        [s['state--destructive']]: state === 'destructive',
      }),
    [state],
  );

  return (
    <div className={className}>
      {props.leadIcon && <div className={s['lead-icon']}>{props.leadIcon}</div>}
      <div className={s.caption}>
        <Typography size={'caption-l'} weight={'regular'}>
          <p>{props.caption}</p>
        </Typography>
      </div>
    </div>
  );
};
