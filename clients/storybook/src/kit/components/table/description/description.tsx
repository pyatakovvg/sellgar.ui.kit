import React from 'react';
import { Typography, useCellData } from '@sellgar/kit';

import s from './default.module.scss';

export const Description: React.FC = () => {
  const { data } = useCellData();

  return (
    <div className={s.wrapper}>
      <Typography size={'caption-l'}>
        <p>{data.title}</p>
      </Typography>
    </div>
  );
};
