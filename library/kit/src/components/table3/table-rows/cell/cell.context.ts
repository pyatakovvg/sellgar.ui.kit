import React from 'react';

export interface IContext<T> {
  data: T;
  deps: number;
}

export const context = React.createContext<IContext<any>>({} as IContext<any>);
export const Provider = context.Provider;
