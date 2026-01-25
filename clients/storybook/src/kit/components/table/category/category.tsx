import React from 'react';
import { Typography, useCellData } from '@sellgar/kit';

import s from './default.module.scss';

export const Category: React.FC = () => {
  const { data } = useCellData();

  return (
    <div className={s.wrapper}>
      <Typography size={'caption-l'}>
        <p>{data.category}</p>
      </Typography>
    </div>
  );
};
