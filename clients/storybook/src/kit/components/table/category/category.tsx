import React from 'react';
import { Typography, useCellData } from '@sellgar/kit';

import s from './default.module.scss';

export const Category: React.FC = () => {
  const node = useCellData();

  return (
    <div className={s.wrapper}>
      <Typography size={'caption-l'}>
        <p>{node.data.category}</p>
      </Typography>
    </div>
  );
};
