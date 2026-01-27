import React from 'react';

export interface IContext<T> {
  data: T;
  deps: number;
  expanded: boolean;
  setExpanded: (expanded: boolean) => void;
  selected: boolean;
  setSelected: (selected: boolean) => void;
}

export const context = React.createContext<IContext<any>>({} as IContext<any>);
export const Provider = context.Provider;
