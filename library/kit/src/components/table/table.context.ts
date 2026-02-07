import React from 'react';

import type { IData } from './table.tsx';
import type { IConfigColumn } from './configuration/create-columns-config.ts';

interface IContext<T> {
  data: IData<T>;
  columns: IConfigColumn<T>[];
  columnsWidth: number[];
  expand?: {
    isExpanded(id: string | number): boolean;
    toggle(node: T): void;
    renderExpanded(node: T): React.ReactNode;
  };
}

let context: any = null;

export const createContext = <T>(): React.Context<IContext<T>> => {
  if (context) return context;

  context = React.createContext<IContext<T>>({} as IContext<T>);

  return context;
};

export const useContext = <T>(): IContext<T> => {
  return React.useContext(context);
};
