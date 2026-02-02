import React from 'react';

import type { INode } from '../../../table.tsx';

export interface CellContextValue<T> {
  data: T;
  deps: number;
}

const CellContext = React.createContext<CellContextValue<INode<any>> | null>(null);

export const CellProvider = CellContext.Provider;

export const useCellData = <T = any,>(): CellContextValue<INode<T>> => {
  const context = React.useContext(CellContext);
  if (!context) {
    throw new Error('useCellData must be used within <CellProvider>.');
  }
  return context as CellContextValue<INode<T>>;
};
