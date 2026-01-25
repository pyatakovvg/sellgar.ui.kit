import React from 'react';

import { TTableDataItem } from '../table.tsx';

export interface ITableCellProps<T> {
  render?: (item: T) => React.ReactNode;
}

interface ITableCellPropsWithDisplayName extends React.FC<React.PropsWithChildren<ITableCellProps<TTableDataItem>>> {
  displayName: string;
}

export const TableCell: ITableCellPropsWithDisplayName = (props) => props.children;
TableCell.displayName = 'Cell';
