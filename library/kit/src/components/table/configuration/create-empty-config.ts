import React from 'react';

import type { IEmptyProps } from './empty/empty.tsx';

export interface IConfigEmpty {
  renderEmpty: () => React.ReactNode;
}

const getValidElementType = <T extends React.FC<React.PropsWithChildren<{ displayName: string }>>>(
  child: React.ReactNode,
) => {
  if (React.isValidElement<T>(child)) {
    if (child.type) {
      if ('displayName' in (child.type as T)) {
        return (child.type as T).displayName;
      }
    }
  }
  return null;
};

export const createEmptyConfig = (children: React.ReactNode): IConfigEmpty | null => {
  let config: IConfigEmpty | null = null;

  React.Children.forEach(children, (child) => {
    const elementType = getValidElementType(child);

    if (elementType !== 'Empty') {
      return;
    }

    const emptyElement = child as React.ReactElement<React.PropsWithChildren<IEmptyProps>>;

    config = {
      renderEmpty: () =>
        React.Children.map(emptyElement.props.children, (emptyChild) => {
          if (React.isValidElement(emptyChild)) {
            const childElement = emptyChild as React.ReactElement<any>;
            return React.cloneElement(childElement);
          }
          return emptyChild;
        }),
    };
  });

  return config;
};
