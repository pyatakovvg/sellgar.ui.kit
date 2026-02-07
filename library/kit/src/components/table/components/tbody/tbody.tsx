import React from 'react';

import { useTableContext } from '../../table.context.ts';

import { Cell } from './cell';
import { CellContext } from './cell/cell.context.ts';

import s from './default.module.scss';

export const TBody = <T,>() => {
  const { data, columns, expand } = useTableContext<T>('TBody');

  return (
    <tbody className={s.body}>
      {data.nodes.map((node, index) => {
        const isExpanded = expand ? expand.isExpanded(node.id) : false;

        return (
          <React.Fragment key={node.id ?? index}>
            <tr className={s.row}>
              {columns.map((column, cellIndex) => {
                const originalIndex = columns.indexOf(column);

                return (
                  <Cell<T>
                    key={cellIndex}
                    originIndex={originalIndex}
                    align={column.align}
                    data={node}
                    collapse={column.collapse}
                    className={column.cellClassName}
                  >
                    {column.renderCell(node.data)}
                  </Cell>
                );
              })}
            </tr>
            {expand && isExpanded && (
              <tr className={s.expandRow}>
                <td className={s.expandCell} colSpan={columns.length}>
                  <CellContext.Provider value={node}>{expand.renderExpanded(node.data)}</CellContext.Provider>
                </td>
              </tr>
            )}
          </React.Fragment>
        );
      })}
    </tbody>
  );
};
