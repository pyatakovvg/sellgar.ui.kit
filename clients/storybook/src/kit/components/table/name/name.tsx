import React from 'react';
import { Avatar, Typography, useCellData } from '@sellgar/kit';

import s from './default.module.scss';

export const Name: React.FC = () => {
  const { data, deps } = useCellData();

  return (
    <div
      className={s.wrapper}
      style={{
        padding: `0 0 0 var(--numbers-${deps * 24})`,
      }}
    >
      <Avatar size={'md'} isStatus={data.status} />
      <Typography size={'caption-l'}>
        <p>{data.name}</p>
      </Typography>
    </div>
  );
};
