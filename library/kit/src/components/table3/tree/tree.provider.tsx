import React from 'react';

import { Provider } from './tree.context.ts';

export const TreeProvider: React.FC<React.PropsWithChildren> = (props) => {
  return <Provider value={{}}>{props.children}</Provider>;
};
