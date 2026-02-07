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
      <td className={s.cell} align={props.align} style={styles}>
        <div className={cellClassName}>{props.children}</div>
      </td>
    </CellContext.Provider>
  );
};
