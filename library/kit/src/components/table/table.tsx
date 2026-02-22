import React from 'react';

import { Scrollbar } from '../wrappers';

import { Cell } from './configuration/cell';
import { Head } from './configuration/head';
import { Column } from './configuration/column';
import { Expand } from './configuration/expand/expand';
import { Empty } from './configuration/empty/empty';

import { THead } from './components/thead';
import { TBody } from './components/tbody';

import { TableContext } from './table.context.ts';
import { TreeProvider, compareColumnsConfig as compareTreeColumnsConfig } from './feature/tree';
import { SelectProvider, compareColumnsConfig as compareSelectColumnsConfig } from './feature/select';
import { RowEventsProvider } from './feature/row-events';

import { useGetColumnsWidth } from './configuration/get-columns-width.hook.ts';
import { useCreateTableGridTemplate } from './configuration/create-grid-template.hook.ts';

import { createDataNodes } from './configuration/create-data-nodes.ts';
import { createColumnConfig } from './configuration/create-columns-config.ts';
import { createExpandConfig } from './configuration/create-expand-config.ts';
import { createEmptyConfig } from './configuration/create-empty-config.ts';

import { ExpandTrigger } from './feature/expand';

import cn from 'classnames';
import s from './default.module.scss';

import type { ITableNode, TNodeId } from './table.types.ts';
import type { IRowConfig, IRowEventPayload, IRowHandlers, TRowTrigger } from './feature/row-events';

export interface IData<T> {
  nodes: T[];
}

interface ITreeProps<T> {
  isUse: boolean;
  accessor: keyof T;
  defaultExpanded?: boolean;
}

interface ISelectProps<T> {
  isUse: boolean;
  onSelect(nodes: T[]): void;
}

interface IProps<T> {
  data: IData<T>;
  tree?: ITreeProps<T>;
  select?: ISelectProps<T>;
  row?: IRowConfig<T>;
  isBordered?: boolean;
  useInternalScroll?: boolean;
}

export const TableComponent = <T,>(props: React.PropsWithChildren<IProps<T>>) => {
  const tableRef = React.useRef<HTMLTableElement>(null);

  const columns = React.useMemo(() => {
    let columns = createColumnConfig<T>(props.children);

    if (props.tree?.isUse) {
      columns = compareTreeColumnsConfig(columns);
    }

    if (props.select?.isUse) {
      columns = compareSelectColumnsConfig(columns);
    }

    return columns;
  }, [props.children, props.select]);

  const { data, nodeIdByData, tree } = React.useMemo(
    () => createDataNodes<T>(props.data, { tree: props.tree, getRowId: props.row?.getRowId }),
    [props.data, props.tree, props.row?.getRowId],
  );
  const expandConfig = React.useMemo(() => createExpandConfig<T>(props.children), [props.children]);
  const emptyConfig = React.useMemo(() => createEmptyConfig(props.children), [props.children]);
  const [expandedIds, setExpandedIds] = React.useState<Set<TNodeId>>(new Set());
  const [expandedTreeIds, setExpandedTreeIds] = React.useState<Set<TNodeId>>(new Set());

  const handleToggleExpand = React.useCallback((id: TNodeId) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }, []);

  const isExpanded = React.useCallback(
    (id: TNodeId) => {
      return expandedIds.has(id);
    },
    [expandedIds],
  );

  React.useEffect(() => {
    if (!props.tree?.isUse || !tree) return;
    if (!props.tree.defaultExpanded) {
      setExpandedTreeIds(new Set());
      return;
    }
    const next = new Set<TNodeId>();
    tree.childrenById.forEach((childIds, id) => {
      if (childIds.length > 0) next.add(id);
    });
    setExpandedTreeIds(next);
  }, [props.tree?.isUse, props.tree?.defaultExpanded, tree]);

  const columnsWidth = useGetColumnsWidth<T>(tableRef, columns);
  const gridTemplateColumns = useCreateTableGridTemplate<T>(columns);

  const resolveNodeId = React.useCallback(
    (node: T) => {
      return nodeIdByData.get(node) ?? props.row?.getRowId?.(node);
    },
    [nodeIdByData, props.row?.getRowId],
  );

  const visibleNodes = React.useMemo(() => {
    if (!props.tree?.isUse || !tree) return data.nodes;

    return data.nodes.filter((node) => {
      let parentId = tree.parentById.get(node.id) ?? null;
      while (parentId) {
        if (!expandedTreeIds.has(parentId)) return false;
        parentId = tree.parentById.get(parentId) ?? null;
      }
      return true;
    });
  }, [data.nodes, expandedTreeIds, props.tree?.isUse, tree]);

  const tableData = React.useMemo<IData<ITableNode<T>>>(() => {
    return { nodes: visibleNodes };
  }, [visibleNodes]);

  const treeContextValue = React.useMemo(
    () => ({
      isExpanded: (id: TNodeId) => expandedTreeIds.has(id),
      toggle: (id: TNodeId) => {
        setExpandedTreeIds((prev) => {
          const next = new Set(prev);
          if (next.has(id)) {
            next.delete(id);
          } else {
            next.add(id);
          }
          return next;
        });
      },
      hasChildren: (id: TNodeId) => {
        const children = tree?.childrenById.get(id);
        return !!children && children.length > 0;
      },
    }),
    [expandedTreeIds, tree],
  );

  const tableContent = (
    <TableContext.Provider
      value={{
        data: tableData,
        columns,
        columnsWidth,
        resolveNodeId,
        row: props.row,
        expand: expandConfig
          ? {
              isExpanded,
              toggleById: handleToggleExpand,
              renderExpanded: expandConfig.renderExpanded,
            }
          : undefined,
        empty: emptyConfig
          ? {
              renderEmpty: emptyConfig.renderEmpty,
            }
          : undefined,
      }}
    >
      <TreeProvider value={treeContextValue}>
        <RowEventsProvider<T> config={props.row}>
          <SelectProvider<T> onSelect={(nodes) => props.select?.onSelect(nodes)}>
            <table ref={tableRef} className={s.table}>
              <THead<T> />
              <TBody<T> />
            </table>
          </SelectProvider>
        </RowEventsProvider>
      </TreeProvider>
    </TableContext.Provider>
  );

  const tableContentStyle: React.CSSProperties = {
    position: 'relative',
    display: 'grid',
    gridTemplateColumns,
    ['--table-head-sticky-top' as string]: 'var(--sticky-layout-before-offset, 0px)',
  };

  if (props.useInternalScroll === false) {
    return (
      <div className={cn(s.wrapper, { [s.wrapperBordered]: props.isBordered ?? true })}>
        <div style={tableContentStyle}>{tableContent}</div>
      </div>
    );
  }

  return (
    <Scrollbar className={cn(s.wrapper, { [s.wrapperBordered]: props.isBordered ?? true })} contentStyle={tableContentStyle}>
      {tableContent}
    </Scrollbar>
  );
};

export type { IRowConfig, IRowEventPayload, IRowHandlers, TRowTrigger };

type TTable = typeof TableComponent & {
  Column: typeof Column;
  Head: typeof Head;
  Cell: typeof Cell;
  Expand: typeof Expand;
  Empty: typeof Empty;
  ExpandTrigger: typeof ExpandTrigger;
};
export const Table: TTable = Object.assign(TableComponent, {
  Column,
  Head,
  Cell,
  Expand,
  Empty,
  ExpandTrigger,
});
