import React from 'react';
import { Avatar, Typography } from '@sellgar/kit';

import s from './default.module.scss';

interface IProps {
  name: string;
  status: boolean;
}

export const Name: React.FC<IProps> = (props) => {
  return (
    <div className={s.wrapper}>
      <Avatar size={'md'} isStatus={props.status} />
      <Typography size={'caption-l'}>
        <p>{props.name}</p>
      </Typography>
    </div>
  );
};
