import React from 'react';

export interface IProps {}

interface ITableCellPropsWithDisplayName extends React.FC<React.PropsWithChildren<IProps>> {
  displayName: string;
}

export const Cell: ITableCellPropsWithDisplayName = (props) => props.children;
Cell.displayName = 'Cell';
