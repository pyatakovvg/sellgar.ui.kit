import React from 'react';

export interface TreeContextValue<T> {}

const TreeContext = React.createContext<TreeContextValue<any> | null>(null);

export const TreeProvider = TreeContext.Provider;

export const useTreeContext = <T,>(): TreeContextValue<T> => {
  const context = React.useContext(TreeContext);
  if (!context) {
    throw new Error('useTreeContext must be used within <TreeProvider>.');
  }
  return context as TreeContextValue<T>;
};
