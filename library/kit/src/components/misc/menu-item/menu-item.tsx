import React from 'react';

import { IBadgeProps, Typography, Icon, TIconName } from '../../symbols';

import cn from 'classnames';
import s from './default.module.scss';

interface IProps {
  leadIcon?: TIconName;
  caption: string;
  active?: boolean;
  badge?: React.ReactElement;
}

export const MenuItem: React.FC<IProps> = (props) => {
  const className = React.useMemo(
    () =>
      cn(s.wrapper, {
        [s.active]: props.active,
      }),
    [props.active],
  );

  return (
    <div className={className}>
      {props.leadIcon && (
        <div className={s['lead-icon']}>
          <Icon icon={props.leadIcon} />
        </div>
      )}
      <div className={s.content}>
        <div className={s.caption}>
          <Typography size={'caption-l'} weight={'semi-bold'}>
            <p>{props.caption}</p>
          </Typography>
        </div>
        {props.badge && (
          <div className={s.badge}>
            {React.cloneElement(props.badge, {
              size: 'xs',
              stroke: true,
              color: 'orange',
            } as IBadgeProps)}
          </div>
        )}
      </div>
    </div>
  );
};
