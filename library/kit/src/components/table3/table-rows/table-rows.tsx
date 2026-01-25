import React from 'react';

import { Row } from './row';

import { type ITree } from '../table.tsx';
import { TableRowProvider } from './table-row.provider.tsx';

interface ITableRowsProps<T> {
  data: T;
  tree?: ITree<T>;
  deps: number;
  index: number;
}

export const TableRows = <T,>(props: React.PropsWithChildren<ITableRowsProps<T>>) => {
  const [expanded, setExpanded] = React.useState(false);

  let rows: React.ReactNode[] = [];

  rows.push(
    <TableRowProvider key={props.index} deps={props.deps} data={props.data} onCallback={setExpanded}>
      <Row<T> data={props.data as T} deps={props.deps} />
    </TableRowProvider>,
  );

  if (expanded && !!props.tree && !!((props.data[props.tree.accessor] as T[]) ?? []).length) {
    rows = [
      ...rows,
      ...(props.data[props.tree.accessor] as T[]).map((item: T, index: number) => (
        <TableRows key={index + '_deps_' + props.deps} index={props.index * props.deps} data={item as T} deps={props.deps + 1} tree={props.tree}>
          {props.children}
        </TableRows>
      )),
    ];
  }

  return rows;
};
