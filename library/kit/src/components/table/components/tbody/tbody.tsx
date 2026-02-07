import React from 'react';

import { useContext } from '../../table.context.ts';

import { Cell } from './cell';
import { createContext as createCellContext } from './cell/cell.context.ts';

import s from './default.module.scss';

export const TBody = <T extends { id: string | number },>() => {
  const { data, columns, expand } = useContext<T>();
  const cellContext = createCellContext<T>();

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
                    {column.renderCell(node)}
                  </Cell>
                );
              })}
            </tr>
            {expand && isExpanded && (
              <tr className={s.expandRow}>
                <td className={s.expandCell} colSpan={columns.length}>
                  <cellContext.Provider value={{ data: node, deps: 0 }}>{expand.renderExpanded(node)}</cellContext.Provider>
                </td>
              </tr>
            )}
          </React.Fragment>
        );
      })}
    </tbody>
  );
};
