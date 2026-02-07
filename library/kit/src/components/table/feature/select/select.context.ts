import React from 'react';

interface IContext<T> {
  isSelectedAll: boolean;
  isIndeterminate: boolean;
  selectedItems: T[];
  hasSelected: (item: T) => boolean;
  addItem: (item: T) => void;
  deleteItem: (item: T) => void;
  selectAll: () => void;
  deleteAll: () => void;
}

export const SelectContext = React.createContext<IContext<any> | null>(null);

const getSelectContextFallback = <T,>(): IContext<T> => ({
  isSelectedAll: false,
  isIndeterminate: false,
  selectedItems: [],
  hasSelected: () => false,
  addItem: () => undefined,
  deleteItem: () => undefined,
  selectAll: () => undefined,
  deleteAll: () => undefined,
});

export const useSelectContext = <T,>(source?: string): IContext<T> => {
  const context = React.useContext(SelectContext);
  if (!context) {
    const label = source ? ` (${source})` : '';
    console.warn(`SelectContext is not available${label}. Ensure SelectContext.Provider is rendered.`);
    return getSelectContextFallback<T>();
  }
  return context as IContext<T>;
};
