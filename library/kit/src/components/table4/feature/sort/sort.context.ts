import React from 'react';

export interface SortContextValue {
  direction?: 'asc' | 'desc';
  onToggle(): void;
}

const SortContext = React.createContext<SortContextValue | null>(null);

export const SortProvider = SortContext.Provider;

export const useSortContext = (): SortContextValue => {
  const context = React.useContext(SortContext);
  if (!context) {
    throw new Error('useSortContext must be used within <SortProvider>.');
  }
  return context;
};
