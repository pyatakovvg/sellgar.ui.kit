import React from 'react';

import type { ITableNode } from '../../../table.types.ts';
import type { TNodeId } from '../../../table.types.ts';

export const CellContext = React.createContext<ITableNode<unknown> | null>(null);

const getCellContextFallback = <T,>(): ITableNode<T> => ({
  id: 0 as TNodeId,
  data: undefined as T,
  deps: 0,
});

export const useCellData = <T,>(source?: string): ITableNode<T> => {
  const context = React.useContext(CellContext);
  if (!context) {
    const label = source ? ` (${source})` : '';
    console.warn(`CellContext is not available${label}. Ensure CellContext.Provider is rendered.`);
    return getCellContextFallback<T>();
  }
  return context as ITableNode<T>;
};
