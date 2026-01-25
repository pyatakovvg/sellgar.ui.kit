import React from 'react';

import { IConfigColumn } from './table.tsx';

interface IContext {
  data: any[];
  config: IConfigColumn<any>[];
  columnsWidth: number[];
}

export const context = React.createContext({} as IContext);
export const Provider = context.Provider;
