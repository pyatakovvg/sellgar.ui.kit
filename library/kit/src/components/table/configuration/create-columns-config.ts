import React from 'react';

import type { IProps as ICellProps } from './cell';
import type { IProps as IHeadProps } from './head';
import type { IProps as IColumnProps, ISort } from './column';
import type { ITableNode } from '../table.types.ts';

export interface IConfigColumn<T> {
  label: React.ReactNode;
  align?: 'left' | 'center' | 'right';
  sort?: ISort;
  width?: number | string;
  collapse?: boolean;
  pinLeft?: boolean;
  pinRight?: boolean;
  pinSource?: 'user' | 'system';
  cellClassName?: string;
  renderCell: (node: ITableNode<T>) => React.ReactNode;
}

const getValidElementType = (child: React.ReactNode) => {
  if (React.isValidElement(child)) {
    if (child.type) {
      if (typeof child.type !== 'string' && 'displayName' in child.type) {
        return child.type.displayName;
      }
    }
  }
  return null;
};

export const createColumnConfig = <T,>(children: React.ReactNode) => {
  let startIndex = 0;
  const config: IConfigColumn<T>[] = [];

  React.Children.forEach(children, (child, index) => {
    const elementType = getValidElementType(child);
    const currentIndex = index + startIndex;

    if (elementType !== 'Column') {
      return null;
    }

    const columnElement = child as React.ReactElement<React.PropsWithChildren<IColumnProps>>;
    const { width, align, sort, pinLeft, pinRight, children: columnChildren } = columnElement.props;

    config[currentIndex] = {
      label: '',
      sort: sort && {
        directionDefault: sort?.directionDefault,
        onToggle: sort?.onToggle,
        onReset: sort?.onReset,
      },
      width,
      align,
      pinLeft,
      pinRight,
      pinSource: pinLeft || pinRight ? 'user' : undefined,
      renderCell: () => null,
    };

    React.Children.forEach(columnChildren, (child) => {
      const elementType = getValidElementType(child);

      if (elementType === 'Head') {
        const headElement = child as React.ReactElement<React.PropsWithChildren<IHeadProps>>;

        config[currentIndex] = {
          ...config[currentIndex],
          label: headElement.props.label ?? '',
        };
      } else if (elementType === 'Cell') {
        const cellElement = child as React.ReactElement<React.PropsWithChildren<ICellProps>>;
        const { render, className } = cellElement.props;

        config[currentIndex] = {
          ...config[currentIndex],
          cellClassName: className,
          renderCell: (node) => {
            if (render) {
              return render(node);
            }

            return React.Children.map(cellElement.props.children, (child) => {
              if (React.isValidElement(child)) {
                const childElement = child as React.ReactElement<any>;

                return React.cloneElement(childElement);
              }
              return child;
            });
          },
        };
      }
    });
  });

  return config.filter(Boolean).sort((left, right) => {
    const getWeight = (item: IConfigColumn<T>) => {
      if (item.pinLeft) return 1;
      if (item.pinRight) return 3;
      return 2;
    };

    return getWeight(left) - getWeight(right);
  });
};
