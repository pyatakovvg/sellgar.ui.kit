import React from 'react';

interface IContext {}

export const context = React.createContext<IContext>({} as IContext);
export const Provider = context.Provider;
