import React from 'react';
import type { ITableNode } from '../../table.types.ts';

export interface IProps<T = any> {
  className?: string;
  render?(node: ITableNode<T>): React.ReactNode;
}

interface ITableCellPropsWithDisplayName {
  <T = any>(props: React.PropsWithChildren<IProps<T>>): React.ReactNode;
  displayName: string;
}

export const Cell: ITableCellPropsWithDisplayName = (props) => props.children;
Cell.displayName = 'Cell';
