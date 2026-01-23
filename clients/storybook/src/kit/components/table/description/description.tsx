import React from 'react';
import { Typography } from '@sellgar/kit';

import s from './default.module.scss';

interface IProps {
  title: string;
}

export const Description: React.FC<IProps> = (props) => {
  return (
    <div className={s.wrapper}>
      <Typography size={'caption-l'}>
        <p>{props.title}</p>
      </Typography>
    </div>
  );
};
