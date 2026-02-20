import React from 'react';

import { useGetPinnedStyles } from '../../get-pinned-styles.hook.ts';
import { CellContext } from './cell.context.ts';

import type { ITableNode } from '../../../table.types.ts';

import cn from 'classnames';
import s from '../default.module.scss';

interface IProps<T> {
  originIndex: number;
  align?: 'left' | 'center' | 'right';
  collapse?: boolean;
  data: ITableNode<T>;
  className?: string;
  cellRef?: React.Ref<HTMLTableCellElement>;
  onClick?: React.MouseEventHandler<HTMLTableCellElement>;
  onDoubleClick?: React.MouseEventHandler<HTMLTableCellElement>;
  onContextMenu?: React.MouseEventHandler<HTMLTableCellElement>;
}

export const Cell = <T,>(props: React.PropsWithChildren<IProps<T>>) => {
  const styles = useGetPinnedStyles(props.originIndex);

  const cellClassName = React.useMemo(
    () =>
      cn(
        s.cellContent,
        props.className,
        {
          [s.collapse]: props.collapse ?? false,
        },
        {
          [s['align--right']]: props.align === 'right',
          [s['align--center']]: props.align === 'center',
        },
      ),
    [props.align, props.collapse, props.className],
  );

  return (
    <CellContext.Provider value={props.data}>
      <td
        ref={props.cellRef}
        className={s.cell}
        align={props.align}
        style={styles}
        onClick={props.onClick}
        onDoubleClick={props.onDoubleClick}
        onContextMenu={props.onContextMenu}
      >
        <div className={cellClassName}>{props.children}</div>
      </td>
    </CellContext.Provider>
  );
};
