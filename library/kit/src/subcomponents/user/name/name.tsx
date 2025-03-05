import React from 'react';

import { Badge, Typography } from '../../../components/symbols';

import s from './default.module.scss';

interface IProps {
  badge?: string;
}

export const Name: React.FC<React.PropsWithChildren<IProps>> = (props) => {
  return (
    <div className={s.wrapper}>
      <div className={s.content}>
        <Typography size={'caption-l'} weight={'semi-bold'}>
          <p className={s.text}>{props.children}</p>
        </Typography>
      </div>
      {props.badge && (
        <div className={s.badge}>
          <Badge size={'xs'} color={'purple'} label={props.badge} />
        </div>
      )}
    </div>
  );
};
