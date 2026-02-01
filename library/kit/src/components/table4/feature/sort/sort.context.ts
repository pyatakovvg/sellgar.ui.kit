import React from 'react';

interface IContext {
  direction?: 'asc' | 'desc';
  onToggle(): void;
}

let context: any = null;

export const createContext = (): React.Context<IContext> => {
  if (context) return context;

  context = React.createContext<IContext>({} as IContext);

  return context;
};

export const useContext = (): IContext => {
  return React.useContext(context);
};
