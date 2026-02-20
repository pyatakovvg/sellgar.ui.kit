import React from 'react';

import type { TNodeId } from '../../table.types.ts';

interface IRowEventsContext<T> {
  onRowClick(event: React.MouseEvent<HTMLTableCellElement>, node: T, id: TNodeId, index: number): void;
  onRowDoubleClick(event: React.MouseEvent<HTMLTableCellElement>, node: T, id: TNodeId, index: number): void;
  onRowContextMenu(event: React.MouseEvent<HTMLTableCellElement>, node: T, id: TNodeId, index: number): void;
}

export const RowEventsContext = React.createContext<IRowEventsContext<any> | null>(null);

const getRowEventsContextFallback = <T,>(): IRowEventsContext<T> => ({
  onRowClick: () => undefined,
  onRowDoubleClick: () => undefined,
  onRowContextMenu: () => undefined,
});

export const useRowEventsContext = <T,>(source?: string): IRowEventsContext<T> => {
  const context = React.useContext(RowEventsContext);
  if (!context) {
    const label = source ? ` (${source})` : '';
    console.warn(`RowEventsContext is not available${label}. Ensure RowEventsContext.Provider is rendered.`);
    return getRowEventsContextFallback<T>();
  }
  return context as IRowEventsContext<T>;
};
