import React from 'react';

import { Icon, type TIconName } from '../icon';
import { Typography } from '../typography';

import cn from 'classnames';
import s from './default.module.scss';

export interface IProps {
  leadicon?: TIconName;
  caption: string;
  state?: 'default' | 'success' | 'destructive';
}

export const CaptionField: React.FC<IProps> = ({ state = 'default', ...props }) => {
  const className = React.useMemo(
    () =>
      cn(s.wrapper, {
        [s['state--default']]: state === 'default',
        [s['state--success']]: state === 'success',
        [s['state--destructive']]: state === 'destructive',
      }),
    [state],
  );

  return (
    <div className={className}>
      {props.leadicon && (
        <div className={s['lead-icon']}>
          <Icon icon={props.leadicon} />
        </div>
      )}
      <div className={s.caption}>
        <Typography size={'caption-l'} weight={'regular'}>
          <p>{props.caption}</p>
        </Typography>
      </div>
    </div>
  );
};
