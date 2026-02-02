import React from 'react';

export interface SelectContextValue<T> {
  isSelectedAll: boolean;
  isIndeterminate: boolean;
  selectedItems: T[];
  hasSelected: (item: T) => boolean;
  addItem: (item: T) => void;
  deleteItem: (item: T) => void;
  selectAll: () => void;
  deleteAll: () => void;
}

const SelectContext = React.createContext<SelectContextValue<any> | null>(null);

export const SelectProvider = SelectContext.Provider;

export const useSelectContext = <T,>(): SelectContextValue<T> => {
  const context = React.useContext(SelectContext);
  if (!context) {
    throw new Error('useSelectContext must be used within <SelectProvider>.');
  }
  return context as SelectContextValue<T>;
};
