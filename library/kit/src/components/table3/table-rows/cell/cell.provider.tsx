import React from 'react';

import { Provider } from './cell.context.ts';

interface IProps<T> {
  data: T;
  deps: number;
}

export const CellProvider = <T,>(props: React.PropsWithChildren<IProps<T>>) => {
  return <Provider value={{ deps: props.deps, data: props.data as T }}>{props.children}</Provider>;
};
