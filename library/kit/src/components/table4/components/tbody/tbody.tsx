import React from 'react';

import { useTableContext } from '../../table.context.ts';

import { Cell } from './cell';

import s from './default.module.scss';

export const TBody = <T,>() => {
  const { data, columns } = useTableContext<T>();

  return (
    <tbody className={s.body}>
      {data.nodes.map((node, index) => {
        return (
          <tr key={index} className={s.row}>
            {columns.map((column, cellIndex) => {
              const originalIndex = columns.indexOf(column);

              return (
                <Cell<T> key={cellIndex} originIndex={originalIndex} align={column.align} data={node} collapse={column.collapse}>
                  {column.renderCell(node)}
                </Cell>
              );
            })}
          </tr>
        );
      })}
    </tbody>
  );
};
