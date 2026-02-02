import React from 'react';

import { TreeProvider as Provider } from './tree.context.ts';

interface IProps<T> {}

export const TreeProvider = <T,>(props: React.PropsWithChildren<IProps<T>>) => {
  return <Provider value={{}}>{props.children}</Provider>;
};
