import React from 'react';

interface IContext {
  isSelectedAll: boolean;
  isIndeterminate: boolean;
  selectedItems: any[];
  hasSelected: (item: any) => boolean;
  addItem: (item: any) => void;
  deleteItem: (item: any) => void;
  selectAll: () => void;
  deleteAll: () => void;
}

export const context = React.createContext({} as IContext);
export const Provider = context.Provider;
