import React from 'react';

import type { IExpandProps } from './expand/expand.tsx';

export interface IConfigExpand<T> {
  renderExpanded: (node: T) => React.ReactNode;
}

const getValidElementType = <T extends React.FC<React.PropsWithChildren<{ displayName: string }>>>(child: React.ReactNode) => {
  if (React.isValidElement<T>(child)) {
    if (child.type) {
      if ('displayName' in (child.type as T)) {
        return (child.type as T).displayName;
      }
    }
  }
  return null;
};

export const createExpandConfig = <T,>(children: React.ReactNode): IConfigExpand<T> | null => {
  let config: IConfigExpand<T> | null = null;

  React.Children.forEach(children, (child) => {
    const elementType = getValidElementType(child);

    if (elementType !== 'Expand') {
      return;
    }

    const expandElement = child as React.ReactElement<React.PropsWithChildren<IExpandProps>>;

    config = {
      renderExpanded: () =>
        React.Children.map(expandElement.props.children, (expandChild) => {
          if (React.isValidElement(expandChild)) {
            const childElement = expandChild as React.ReactElement<any>;
            return React.cloneElement(childElement);
          }
          return expandChild;
        }),
    };
  });

  return config;
};
