import React from 'react';
import { Typography } from '@sellgar/kit';

import s from './default.module.scss';

interface IProps {
  category: string;
}

export const Category: React.FC<IProps> = (props) => {
  return (
    <div className={s.wrapper}>
      <Typography size={'caption-l'}>
        <p>{props.category}</p>
      </Typography>
    </div>
  );
};
