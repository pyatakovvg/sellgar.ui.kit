import React from 'react';

interface IContext<T> {}

let context: any = null;

export const createContext = <T>(): React.Context<IContext<T>> => {
  if (context) return context;

  context = React.createContext<IContext<T>>({} as IContext<T>);

  return context;
};

export const useContext = <T>(): IContext<T> => {
  return React.useContext(context);
};
