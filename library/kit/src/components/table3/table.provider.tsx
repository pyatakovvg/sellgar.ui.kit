import React from 'react';

import { Provider } from './table.context.ts';
import { type IConfigColumn } from './table.tsx';

interface IProviderProps<T> {
  data: T[];
  columnsWidth: number[];
  config: IConfigColumn<T>[];
}

export const TableProvider = <T,>(props: React.PropsWithChildren<IProviderProps<T>>) => {
  return (
    <Provider
      value={{
        data: props.data,
        columnsWidth: props.columnsWidth,
        config: props.config,
      }}
    >
      {props.children}
    </Provider>
  );
};
