import React from 'react';

interface IContext {
  direction?: 'asc' | 'desc';
  onToggle(): void;
}

export const SortContext = React.createContext<IContext | null>(null);

const getSortContextFallback = (): IContext => ({
  direction: undefined,
  onToggle: () => undefined,
});

export const useSortContext = (source?: string): IContext => {
  const context = React.useContext(SortContext);
  if (!context) {
    const label = source ? ` (${source})` : '';
    console.warn(`SortContext is not available${label}. Ensure SortContext.Provider is rendered.`);
    return getSortContextFallback();
  }
  return context;
};
