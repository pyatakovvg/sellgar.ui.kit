import React from 'react';

import { Cell } from '../cell';

import { context as tableContext } from '../../table.context.ts';
import { context as rowContext } from '../table-row.context.ts';
import { getPinColumnStyles, type TTableDataItem } from '../../table.tsx';

import cn from 'classnames';
import s from './default.module.scss';

interface IProps<T> {
  data: T;
  deps: number;
}

export const Row = <T,>(props: IProps<T>) => {
  const { config, columnsWidth } = React.useContext(tableContext);
  const { expanded, selected, setExpanded, setSelected } = React.useContext(rowContext);

  const getPinStyles = React.useCallback(getPinColumnStyles, [config, columnsWidth]);

  return (
    <tr
      className={cn(s.row, {
        [s.selected]: selected,
      })}
      onClick={() => setSelected(!selected)}
      onDoubleClick={() => setExpanded(!expanded)}
    >
      {config.map((column, cellIndex) => {
        const originalIndex = config.indexOf(column);
        const styles = getPinStyles<TTableDataItem[]>(originalIndex, config, columnsWidth);

        return (
          <td
            key={cellIndex}
            className={cn(s.cell, {
              [s['align--right']]: column.align === 'right',
              [s['align--center']]: column.align === 'center',
            })}
            style={styles}
            align={column.align}
          >
            <Cell<T> columnIndex={originalIndex} collapse={column.collapse ?? false} data={props.data}>
              {column.renderCell(props.data)}
            </Cell>
          </td>
        );
      })}
    </tr>
  );
};
