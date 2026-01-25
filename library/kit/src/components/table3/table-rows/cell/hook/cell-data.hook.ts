import React from 'react';

import { type TTableDataItem } from '../../../table.tsx';
import { context, type IContext } from '../cell.context.ts';

export const useCellData = <T extends TTableDataItem = TTableDataItem>(): IContext<T> => {
  const { data, deps } = React.useContext(context);

  return { data, deps };
};
