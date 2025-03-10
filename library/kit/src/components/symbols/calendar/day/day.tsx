import React from 'react';

import { Typography } from '../../typography';

import cn from 'classnames';
import s from './default.module.scss';

interface IProps {
  isActive?: boolean;
  isToday?: boolean;
  isWeekday?: boolean;
  onClick(): void;
}

export const Day: React.FC<React.PropsWithChildren<IProps>> = (props) => {
  const className = React.useMemo(
    () =>
      cn(s.container, {
        [s['is-active']]: props.isActive,
        [s['is-today']]: props.isToday,
        [s['is-weekday']]: props.isWeekday,
      }),
    [props.isActive, props.isToday, props.isWeekday],
  );

  return (
    <div className={s.wrapper} onClick={props.onClick}>
      <div className={className}>
        <Typography size={'caption-l'} weight={'medium'}>
          <p>{props.children}</p>
        </Typography>
      </div>
    </div>
  );
};
