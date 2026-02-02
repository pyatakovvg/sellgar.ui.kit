import React from 'react';

import { useGetPinnedStyles } from '../../get-pinned-styles.hook.ts';
import { CellProvider } from './cell.context.ts';

import cn from 'classnames';
import s from '../default.module.scss';

interface IProps<T> {
  originIndex: number;
  align?: 'left' | 'center' | 'right';
  collapse?: boolean;
  data: T;
}

export const Cell = <T,>(props: React.PropsWithChildren<IProps<T>>) => {
  const styles = useGetPinnedStyles(props.originIndex);

  const cellClassName = React.useMemo(
    () =>
      cn(
        s.cellContent,
        {
          [s.collapse]: props.collapse ?? false,
        },
        {
          [s['align--right']]: props.align === 'right',
          [s['align--center']]: props.align === 'center',
        },
      ),
    [props.align, props.collapse],
  );

  return (
    <CellProvider value={{ data: props.data, deps: 0 }}>
      <td className={s.cell} align={props.align} style={styles}>
        <div className={cellClassName}>{props.children}</div>
      </td>
    </CellProvider>
  );
};
