import React from 'react';

import { Head } from './head';
import { Cell } from './cell';

import type { IConfigColumn } from '../../configuration/create-columns-config.ts';

export const compareColumnsConfig = <T,>(columns: IConfigColumn<T>[]): IConfigColumn<T>[] => {
  return [
    {
      label: <Head />,
      width: 16,
      align: 'center',
      pinLeft: true,
      collapse: true,
      renderCell: (_) => {
        return <Cell />;
      },
    },
    ...columns,
  ];
};
