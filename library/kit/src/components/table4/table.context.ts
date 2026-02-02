import React from 'react';

import type { IData } from './table.tsx';
import type { IConfigColumn } from './configuration/create-columns-config.ts';

export interface TableContextValue<T> {
  data: IData<T>;
  columns: IConfigColumn<T>[];
  columnsWidth: number[];
}

const TableContext = React.createContext<TableContextValue<any>>({} as TableContextValue<any>);

export const TableProvider = TableContext.Provider;

export const useTableContext = <T>(): TableContextValue<T> => {
  const context = React.useContext(TableContext);
  if (!context) {
    throw new Error('useTableContext must be used within <TableProvider>.');
  }
  return context as TableContextValue<T>;
};
