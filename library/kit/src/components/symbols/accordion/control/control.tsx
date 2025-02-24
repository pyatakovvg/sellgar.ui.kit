import React from 'react';

import { Icon } from '../../icon';
import { Typography } from '../../typography';

import s from './default.module.scss';

interface IProps {
  size?: 'lg' | 'md';
  isExpanded: boolean;
}

export const Control: React.FC<React.PropsWithChildren<IProps>> = (props) => {
  return (
    <div className={s.wrapper}>
      <div className={s.content}>
        <Typography size={props.size === 'lg' ? 'body-m' : 'body-s'} weight={'medium'}>
          <p>{props.children}</p>
        </Typography>
      </div>
      <div className={s['expand-icon']}>
        {props.isExpanded ? <Icon icon={'subtract-line'} /> : <Icon icon={'add-line'} />}
      </div>
    </div>
  );
};
