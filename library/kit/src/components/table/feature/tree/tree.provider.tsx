import React from 'react';

import type { ITreeContext } from './tree.context.ts';
import { TreeContext } from './tree.context.ts';

interface IProps {
  value: ITreeContext;
}

export const TreeProvider = (props: React.PropsWithChildren<IProps>) => {
  return <TreeContext.Provider value={props.value}>{props.children}</TreeContext.Provider>;
};
