import React from 'react';

export interface ISort {
  directionDefault?: 'asc' | 'desc';
  onToggle(direction?: 'asc' | 'desc'): void;
  onReset?(): void;
}

export interface IProps {
  width?: number;
  align?: 'left' | 'center' | 'right';
  pinLeft?: boolean;
  pinRight?: boolean;
  sort?: ISort;
}

interface IColumnPropsWithDisplayName extends React.FC<React.PropsWithChildren<IProps>> {
  displayName: string;
}

export const Column: IColumnPropsWithDisplayName = (props) => props.children;
Column.displayName = 'Column';
