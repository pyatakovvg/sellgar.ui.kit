import React from 'react';

import type { IData } from './table.tsx';
import type { ITableNode, TNodeId } from './table.types.ts';
import type { IConfigColumn } from './configuration/create-columns-config.ts';

interface IContext<T> {
  data: IData<ITableNode<T>>;
  columns: IConfigColumn<T>[];
  columnsWidth: number[];
  resolveNodeId(node: T): TNodeId | undefined;
  expand?: {
    isExpanded(id: TNodeId): boolean;
    toggleById(id: TNodeId): void;
    renderExpanded(node: T): React.ReactNode;
  };
}

export const TableContext = React.createContext<IContext<unknown> | null>(null);

const getTableContextFallback = <T,>(): IContext<T> => ({
  data: { nodes: [] },
  columns: [],
  columnsWidth: [],
  resolveNodeId: () => undefined,
});

export const useTableContext = <T,>(source?: string): IContext<T> => {
  const context = React.useContext(TableContext);
  if (!context) {
    const label = source ? ` (${source})` : '';
    console.warn(`TableContext is not available${label}. Ensure TableContext.Provider is rendered.`);
    return getTableContextFallback<T>();
  }
  return context as IContext<T>;
};
