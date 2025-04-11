import React from 'react';

interface IContext {
  size?: 'lg' | 'md' | 'sm';
  shape?: 'rounded' | 'pill';
  type?: 'fill' | 'line' | 'segmented';
  activeTabName?: string;
  setActiveTabName?(tabName: string): void;
  onClick: (tabName?: string) => void;
}

export const context = React.createContext<IContext>({} as IContext);
export const Provider = context.Provider;
