import React from 'react';

import type { TNodeId } from '../../table.types.ts';

export interface ITreeContext {
  isExpanded(id: TNodeId): boolean;
  toggle(id: TNodeId): void;
  hasChildren(id: TNodeId): boolean;
}

export const TreeContext = React.createContext<ITreeContext | null>(null);

const getTreeContextFallback = (): ITreeContext => ({
  isExpanded: () => true,
  toggle: () => undefined,
  hasChildren: () => false,
});

export const useTreeContext = (source?: string): ITreeContext => {
  const context = React.useContext(TreeContext);
  if (!context) {
    const label = source ? ` (${source})` : '';
    console.warn(`TreeContext is not available${label}. Ensure TreeContext.Provider is rendered.`);
    return getTreeContextFallback();
  }
  return context;
};
