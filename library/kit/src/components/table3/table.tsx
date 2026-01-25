import React from 'react';

import { Scrollbar } from '../wrappers';
import { Typography } from '../symbols';

import { TitleArrow, RowArrow, TreeProvider } from './tree';
import { TitleCheckbox, RowCheckbox, SelectProvider } from './select';

import { TableRows } from './table-rows';
import { TableCell, type ITableCellProps } from './table-cell';

import { TableProvider } from './table.provider.tsx';

import { getColumnWidth } from './get-columns-width.hook.ts';

import cn from 'classnames';
import s from './default.module.scss';

export type TTableDataItem = Record<string, any>;

interface IColumnProps {
  width?: number;
  align?: 'left' | 'center' | 'right';
  pinLeft?: boolean;
  pinRight?: boolean;
}

interface IColumnPropsWithDisplayName extends React.FC<React.PropsWithChildren<IColumnProps>> {
  displayName: string;
}

const Column: IColumnPropsWithDisplayName = (props) => props.children;
Column.displayName = 'Column';

interface IHeadProps {
  label?: string;
}

interface IHeadPropsWithDisplayName extends React.FC<IHeadProps> {
  displayName: string;
}

const Head: IHeadPropsWithDisplayName = () => null;
Head.displayName = 'Head';

interface ICaptionProps {
  label?: string;
}

interface ICaptionPropsWithDisplayName extends React.FC<ICaptionProps> {
  displayName: string;
}

const Caption: ICaptionPropsWithDisplayName = () => null;
Caption.displayName = 'Caption';

interface ITableSelectProps<T> {
  isUse: boolean;
  onChange: (items: T[]) => void;
}

export interface ITree<T> {
  isUse: boolean;
  accessor: keyof T;
  defaultExpanded?: boolean;
}

interface ITableProps<T> {
  data: T[];
  tree?: ITree<T>;
  select?: ITableSelectProps<T>;
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

export interface IConfigColumn<T> {
  type: 'control' | 'data';
  label: React.ReactNode;
  align?: 'left' | 'center' | 'right';
  width?: number;
  collapse?: boolean;
  pinLeft?: boolean;
  pinRight?: boolean;
  renderCell: (items: T) => React.ReactNode;
}

interface IColumnConfigOptions {
  isSelect?: boolean;
  isTree?: boolean;
}

const getColumnConfig = <T,>(children: React.ReactNode, options: IColumnConfigOptions) => {
  let startIndex = 0;
  const config: IConfigColumn<T>[] = [];

  if (options.isSelect) {
    config[startIndex] = {
      type: 'control',
      label: <TitleCheckbox />,
      width: 40,
      align: 'center',
      pinLeft: true,
      renderCell: (item) => {
        return <RowCheckbox item={item} />;
      },
    };
    startIndex++;
  }

  if (options.isTree) {
    config[startIndex] = {
      type: 'control',
      label: <TitleArrow />,
      width: 16,
      align: 'center',
      pinLeft: true,
      collapse: true,
      renderCell: (_) => {
        return <RowArrow />;
      },
    };
    startIndex++;
  }

  React.Children.forEach(children, (child, index) => {
    const elementType = getValidElementType(child);
    const currentIndex = index + startIndex;

    if (elementType !== 'Column') {
      return null;
    }

    const columnElement = child as React.ReactElement<React.PropsWithChildren<IColumnProps>>;
    const { width, align, pinLeft, pinRight, children: columnChildren } = columnElement.props;

    config[currentIndex] = {
      type: 'data',
      label: '',
      width,
      align,
      pinLeft,
      pinRight,
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
        const cellElement = child as React.ReactElement<React.PropsWithChildren<ITableCellProps<T>>>;

        config[currentIndex] = {
          ...config[currentIndex],
          renderCell: () => {
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

  return config.sort((left, right) => {
    const getWeight = (item: IConfigColumn<T>) => {
      if (item.pinLeft) return 1;
      if (item.pinRight) return 3;
      return 2;
    };

    return getWeight(left) - getWeight(right);
  });
};

export const getPinColumnStyles = <T,>(columnIndex: number, config: IConfigColumn<T>[], columnWidths: number[]) => {
  if (columnWidths.length === 0) return {};

  const column = config[columnIndex];

  if (!column) return {};

  if (!column.pinLeft && !column.pinRight) return {};

  let position = 0;

  if (column.pinLeft) {
    for (let i = 0; i < columnIndex; i++) {
      if (config[i].pinLeft) {
        position += columnWidths[i] || 0;
      }
    }
    return {
      left: `${position}px`,
      zIndex: 10,
    };
  }

  if (column.pinRight) {
    for (let i = columnIndex + 1; i < config.length; i++) {
      if (config[i].pinRight) {
        position += columnWidths[i] || 0;
      }
    }
    return {
      right: `${position}px`,
      zIndex: 10,
    };
  }

  return {};
};

export const TableComponent = <TDataValue extends TTableDataItem>(props: React.PropsWithChildren<ITableProps<TDataValue>>) => {
  const config = React.useMemo(
    () =>
      getColumnConfig<TDataValue>(props.children, {
        isTree: props.tree?.isUse,
        isSelect: props.select?.isUse,
      }),
    [props],
  );

  const tableRef = React.useRef<HTMLTableElement>(null);
  const columnWidths = getColumnWidth<TDataValue>(tableRef, config);

  const createTableGridTemplate = React.useCallback(
    (config: IConfigColumn<TDataValue>[]) => {
      return config
        .map((column) => {
          if (column.width) {
            return `var(--numbers-${column.width})`;
          }
          return 'auto';
        })
        .join(' ');
    },
    [config],
  );

  const getPinStyles = React.useCallback(getPinColumnStyles, [config, columnWidths]);

  return (
    <Scrollbar
      className={s.wrapper}
      contentStyle={{
        position: 'relative',
        display: 'grid',
        overflow: 'auto',
        gridTemplateColumns: createTableGridTemplate(config),
      }}
    >
      <TableProvider columnsWidth={columnWidths} config={config} data={props.data}>
        <TreeProvider>
          <SelectProvider onSelect={(items) => props.select?.onChange(items)}>
            <table ref={tableRef} className={s.table}>
              <thead className={s.head}>
                <tr className={s.header}>
                  {config.map((column, index) => {
                    const originalIndex = config.indexOf(column);
                    const styles = getPinStyles<TDataValue>(originalIndex, config, columnWidths);

                    if (React.isValidElement(column.label)) {
                      return (
                        <th
                          key={index}
                          className={cn(
                            s.title,
                            {
                              [s.collapse]: column.collapse ?? false,
                            },
                            {
                              [s['align--right']]: column.align === 'right',
                              [s['align--center']]: column.align === 'center',
                            },
                          )}
                          style={styles}
                          align={column.align}
                        >
                          {column.label}
                        </th>
                      );
                    }

                    return (
                      <th
                        key={index}
                        className={cn(
                          s.title,
                          {
                            [s.collapse]: column.collapse ?? false,
                          },
                          {
                            [s['align--right']]: column.align === 'right',
                            [s['align--center']]: column.align === 'center',
                          },
                        )}
                        style={styles}
                        align={column.align}
                      >
                        <Typography size={'caption-l'}>
                          <p>{column.label}</p>
                        </Typography>
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody className={s.body}>
                {props.data.map((item, rowIndex) => {
                  return <TableRows key={'row_' + rowIndex} data={item} tree={props.tree} deps={0} index={rowIndex} />;
                })}
              </tbody>
            </table>
          </SelectProvider>
        </TreeProvider>
      </TableProvider>
    </Scrollbar>
  );
};

type TTable = typeof TableComponent & {
  Column: typeof Column;
  Head: typeof Head;
  Cell: typeof TableCell;
  Caption: typeof Caption;
};
export const Table: TTable = Object.assign(TableComponent, {
  Column,
  Head,
  Cell: TableCell,
  Caption,
});
