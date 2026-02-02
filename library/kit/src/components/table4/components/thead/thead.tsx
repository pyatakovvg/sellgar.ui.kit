import React from 'react';

import { Cell } from './cell';

import { useTableContext } from '../../table.context.ts';
import { SortProvider } from '../../feature/sort';

import s from './default.module.scss';

export const THead = <T,>() => {
  const { columns } = useTableContext<T>();

  return (
    <thead className={s.head}>
      <tr className={s.header}>
        {columns.map((column, cellIndex) => {
          const originalIndex = columns.indexOf(column);

          return (
            <SortProvider key={cellIndex} directionDefault={column.sort?.directionDefault} onToggle={column.sort?.onToggle}>
              <Cell originIndex={originalIndex} align={column.align} collapse={column.collapse} sort={column.sort}>
                {column.label}
              </Cell>
            </SortProvider>
          );
        })}
      </tr>
    </thead>
  );
};
