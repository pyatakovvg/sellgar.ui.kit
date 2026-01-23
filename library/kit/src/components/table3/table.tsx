import React from 'react';

import { Scrollbar } from '../wrappers';
import { Typography } from '../symbols';
import { Checkbox } from '../symbols';

import { context } from './table.context.ts';
import { TableProvider } from './table.provider.tsx';

import s from './default.module.scss';

interface IColumnProps {
  width?: number;
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

interface ICellProps {
  render?: (item: any) => React.ReactNode;
}

interface ICellPropsWithDisplayName extends React.FC<React.PropsWithChildren<ICellProps>> {
  displayName: string;
}

const Cell: ICellPropsWithDisplayName = (props) => props.children;
Cell.displayName = 'Cell';

interface ITableSelectProps {
  isUse: boolean;
  onChange: (items: any[]) => void;
}

interface ITableProps {
  data: any[];
  select?: ITableSelectProps;
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

interface IConfigColumn {
  label: React.ReactNode;
  width?: number;
  pinLeft?: boolean;
  pinRight?: boolean;
  renderCell: (items: any) => React.ReactNode;
}

interface IColumnConfigOptions {
  isSelect?: boolean;
}

const TitleCheckbox: React.FC = () => {
  const { isSelectedAll, isIndeterminate, selectAll, deleteAll } = React.useContext(context);

  return (
    <Checkbox
      size={'sm'}
      checked={isSelectedAll}
      isIndeterminate={isIndeterminate}
      onChange={() => {
        if (isIndeterminate) {
          selectAll();
        } else if (isSelectedAll) {
          deleteAll();
        } else {
          selectAll();
        }
      }}
    />
  );
};

interface IRowCheckboxProps {
  item: any;
}

const RowCheckbox: React.FC<IRowCheckboxProps> = (props) => {
  const { addItem, deleteItem, hasSelected } = React.useContext(context);

  return (
    <Checkbox
      size={'sm'}
      checked={hasSelected(props.item)}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.checked) {
          addItem(props.item);
        } else {
          deleteItem(props.item);
        }
      }}
    />
  );
};

const getColumnConfig = (children: React.ReactNode, options: IColumnConfigOptions) => {
  let startIndex = 0;
  const config: IConfigColumn[] = [];

  if (options.isSelect) {
    config[startIndex] = {
      label: <TitleCheckbox />,
      width: 40,
      pinLeft: true,
      renderCell: (item: any) => {
        return <RowCheckbox item={item} />;
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
    const { width, pinLeft, pinRight, children: columnChildren } = columnElement.props;

    config[currentIndex] = {
      label: '',
      width,
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
        const cellElement = child as React.ReactElement<React.PropsWithChildren<ICellProps>>;

        config[currentIndex] = {
          ...config[currentIndex],
          renderCell: (item: any) => {
            if (cellElement.props.render) {
              return cellElement.props.render(item);
            }
            return React.Children.map(cellElement.props.children, (child) => {
              if (React.isValidElement(child)) {
                const childElement = child as any;
                return React.cloneElement(childElement, {
                  ...(item as any),
                });
              }
              return child;
            });
          },
        };
      }
    });
  });

  return config.sort((left, right) => {
    const getWeight = (item: IConfigColumn) => {
      if (item.pinLeft) return 1;
      if (item.pinRight) return 3;
      return 2;
    };

    return getWeight(left) - getWeight(right);
  });
};

export const TableComponent: React.FC<React.PropsWithChildren<ITableProps>> = (props) => {
  const config = React.useMemo(
    () =>
      getColumnConfig(props.children, {
        isSelect: props.select?.isUse,
      }),
    [props],
  );

  const [columnWidths, setColumnWidths] = React.useState<number[]>([]);
  const tableRef = React.useRef<HTMLTableElement>(null);
  const resizeObserverRef = React.useRef<ResizeObserver | null>(null);

  React.useEffect(() => {
    if (!tableRef.current) return;

    const updateColumnWidths = () => {
      const table = tableRef.current;

      if (!table) return;

      const headers = table.querySelectorAll('thead th');
      const widths = Array.from(headers).map((header) => header.getBoundingClientRect().width);

      setColumnWidths(widths);
    };

    resizeObserverRef.current = new ResizeObserver(updateColumnWidths);
    resizeObserverRef.current.observe(tableRef.current);

    updateColumnWidths();

    return () => {
      resizeObserverRef.current?.disconnect();
    };
  }, [config]);

  const createTableGridTemplate = React.useCallback(
    (config: IConfigColumn[]) => {
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

  const getPinStyles = React.useCallback(
    (columnIndex: number) => {
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
    },
    [config, columnWidths],
  );

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
      <TableProvider data={props.data} onSelect={(items) => props.select?.onChange(items)}>
        <table ref={tableRef} className={s.table}>
          <thead className={s.head}>
            <tr className={s.header}>
              {config.map((column, index) => {
                const originalIndex = config.indexOf(column);
                const styles = getPinStyles(originalIndex);

                if (React.isValidElement(column.label)) {
                  return (
                    <th key={index} className={s.title} style={styles}>
                      {column.label}
                    </th>
                  );
                }

                return (
                  <th key={index} className={s.title} style={styles}>
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
              return (
                <tr key={'row_' + rowIndex} className={s.row}>
                  {config.map((column, cellIndex) => {
                    const originalIndex = config.indexOf(column);
                    const styles = getPinStyles(originalIndex);

                    return (
                      <td key={'row_' + rowIndex + '_cell_' + cellIndex} className={s.cell} style={styles}>
                        <div className={s.cellContent}>{column.renderCell(item)}</div>
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </TableProvider>
    </Scrollbar>
  );
};

type TTable = typeof TableComponent & {
  Column: typeof Column;
  Head: typeof Head;
  Cell: typeof Cell;
  Caption: typeof Caption;
};
export const Table: TTable = Object.assign(TableComponent, {
  Column,
  Head,
  Cell,
  Caption,
});
