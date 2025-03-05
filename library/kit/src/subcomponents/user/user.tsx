import React from 'react';

import { Name } from './name';
import { Avatar, Typography } from '../../components/symbols';

import s from './default.module.scss';

interface IProps {
  name: string;
  caption?: string;
  badge?: string;
}

export const User: React.FC<IProps> = (props) => {
  return (
    <div className={s.wrapper}>
      <div className={s.avatar}>
        <Avatar size={'sm'} color={'orange'} />
      </div>
      <div className={s.content}>
        <div className={s.name}>
          <Name badge={props.badge}>{props.name}</Name>
        </div>
        {props.caption && (
          <div className={s.caption}>
            <Typography size={'caption-s'} weight={'medium'}>
              <p>{props.caption}</p>
            </Typography>
          </div>
        )}
      </div>
    </div>
  );
};
