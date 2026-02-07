import React from 'react';

import { createContext } from './tree.context.ts';

interface IProps<T> {}

export const TreeProvider = <T,>(props: React.PropsWithChildren<IProps<T>>) => {
  const context = createContext<T>();

  return <context.Provider value={{}}>{props.children}</context.Provider>;
};
