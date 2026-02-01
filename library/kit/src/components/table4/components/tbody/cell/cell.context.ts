import React from 'react';

import type { INode } from '../../../table.tsx';

interface IContext<T> {
  data: T;
  deps: number;
}

let context: any = null;

export const createContext = <T>(): React.Context<IContext<T>> => {
  if (context) return context;

  context = React.createContext<IContext<T>>({} as IContext<T>);

  return context;
};

export const useCellData = <T extends INode>(): IContext<T> => {
  return React.useContext<IContext<T>>(context);
};
