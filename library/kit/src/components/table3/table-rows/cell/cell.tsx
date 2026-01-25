import React from 'react';

import { CellProvider } from './cell.provider.tsx';
import { context as rowContext } from '../table-row.context.ts';

import cn from 'classnames';
import s from './default.module.scss';

interface IProps<T> {
  data: T;
  collapse: boolean;
  columnIndex: number;
}

export const Cell = <T,>(props: React.PropsWithChildren<IProps<T>>) => {
  const { deps } = React.useContext(rowContext);

  const className = React.useMemo(
    () =>
      cn(s.cellContent, {
        [s.collapse]: props.collapse,
      }),
    [props.collapse],
  );

  return (
    <CellProvider<T> deps={deps} data={props.data}>
      <div className={className}>{props.children}</div>
    </CellProvider>
  );
};
