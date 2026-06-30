import React from 'react';

import { useTableColumnWidths } from './adapter/column-widths.ts';
import { useTableExpansion } from './adapter/expansion.ts';
import { useTableRowEvents } from './adapter/row-events.ts';
import { useTableSelection } from './adapter/selection.ts';
import { useTableSort } from './adapter/sort.ts';
import { useTableTree } from './adapter/tree.ts';
import { Cell } from './configuration/cell.tsx';
import { Column } from './configuration/column.tsx';
import { Empty } from './configuration/empty.tsx';
import { Expand } from './configuration/expand.tsx';
import { ExpandTrigger } from './configuration/expand-trigger.tsx';
import { Head } from './configuration/head.tsx';
import { createTableSchema } from './configuration/schema.ts';
import { CellRuntime } from './runtime/cell-runtime.ts';
import { TableRuntime } from './runtime/table-runtime.ts';
import { TableView } from './view';

import type { TableRowConfig } from './adapter/row-events.ts';
import type { TableLastRowTriggerConfig } from './adapter/last-row-trigger.ts';
import type { TableColumnProps } from './configuration/column.tsx';
import type { TableExpandProps } from './configuration/expand.tsx';
import type {
  TableCellSnapshot,
  TableColumnModel,
  TableDataLineSnapshot,
  TableExpandedLineSnapshot,
  TableNodeId,
} from './runtime/types.ts';

export type {
  TableRowConfig,
  TableRowEventContext,
  TableRowEventPayload,
  TableRowEventTrigger,
  TableRowHandlers,
} from './adapter/row-events.ts';

export interface TableData<T extends object> {
  nodes: T[];
}

export interface TableSelectConfig<T extends object> {
  isUse: boolean;
  onSelect?(rows: T[]): void;
}

export interface TableTreeConfig<T extends object> {
  isUse: boolean;
  accessor: keyof T;
  defaultExpanded?: boolean;
}

export type TableSurface = 'standalone' | 'embedded';
export type TableStyle = 'primary' | 'secondary';
export type TableSize = 'sm' | 'md' | 'lg';
export type TableLayoutScroll = 'internal' | 'external';

export interface TableStickyHeaderConfig {
  top?: string;
}

export interface TableLayoutConfig {
  scroll?: TableLayoutScroll;
  stickyHeader?: boolean | TableStickyHeaderConfig;
}

interface TableResolvedLayout {
  scroll: TableLayoutScroll;
  stickyHeader: {
    enabled: boolean;
    top: string;
  };
}

export interface TableProps<T extends object> {
  data: TableData<T>;
  select?: TableSelectConfig<T>;
  tree?: TableTreeConfig<T>;
  row?: TableRowConfig<T>;
  lastRowTrigger?: TableLastRowTriggerConfig<T>;
  surface?: TableSurface;
  layout?: TableLayoutConfig;
  style?: TableStyle;
  size?: TableSize;
  className?: string;
}

export interface TableRootScope<T extends object = object> {
  Column(props: TableColumnProps<T>): React.ReactNode;
  Empty: typeof Empty;
  Expand(props: React.PropsWithChildren<TableExpandProps<T>>): React.ReactNode;
}

export type TableChildren<T extends object = object> =
  | React.ReactNode
  | ((scope: TableRootScope<T>) => React.ReactNode);

export interface TableComponentProps<T extends object> extends TableProps<T> {
  children?: TableChildren<T>;
}

const createTableRootScope = <T extends object>(): TableRootScope<T> => ({
  Column: Column as (props: TableColumnProps<T>) => React.ReactNode,
  Empty,
  Expand: Expand as (props: React.PropsWithChildren<TableExpandProps<T>>) => React.ReactNode,
});

const resolveTableChildren = <T extends object>(children: TableChildren<T> | undefined): React.ReactNode => {
  if (typeof children !== 'function') return children;

  return children(createTableRootScope<T>());
};

const resolveTableLayout = (layout: TableLayoutConfig | undefined): TableResolvedLayout => {
  const scroll = layout?.scroll ?? 'internal';
  const stickyHeader = layout?.stickyHeader ?? true;

  if (stickyHeader === false) {
    return {
      scroll,
      stickyHeader: {
        enabled: false,
        top: '0px',
      },
    };
  }

  return {
    scroll,
    stickyHeader: {
      enabled: true,
      top: stickyHeader === true ? '0px' : (stickyHeader.top ?? '0px'),
    },
  };
};

const isTreeNodeExpanded = (
  nodeId: TableNodeId,
  defaultExpanded: boolean | undefined,
  toggledNodeIds: ReadonlySet<TableNodeId>,
): boolean => {
  const isToggled = toggledNodeIds.has(nodeId);

  return defaultExpanded ? !isToggled : isToggled;
};

export const TableComponent = <T extends object>(props: TableComponentProps<T>) => {
  const runtimeRef = React.useRef<TableRuntime<T, React.ReactNode, React.ReactNode> | null>(null);
  const cellRuntimeRef = React.useRef<CellRuntime<T, React.ReactNode, React.ReactNode> | null>(null);

  if (!runtimeRef.current) {
    runtimeRef.current = new TableRuntime<T, React.ReactNode, React.ReactNode>();
  }

  if (!cellRuntimeRef.current) {
    cellRuntimeRef.current = new CellRuntime<T, React.ReactNode, React.ReactNode>();
  }

  const schemaChildren = React.useMemo(() => resolveTableChildren<T>(props.children), [props.children]);
  const schema = React.useMemo(() => createTableSchema<T>(schemaChildren), [schemaChildren]);
  const isSelectionEnabled = Boolean(props.select?.isUse);
  const selectionOnSelect = props.select?.onSelect;
  const isTreeEnabled = Boolean(props.tree?.isUse);
  const treeAccessor = props.tree?.accessor;
  const treeDefaultExpanded = props.tree?.defaultExpanded;
  const layout = React.useMemo(() => resolveTableLayout(props.layout), [props.layout]);
  const { columnWidths, setColumnElement } = useTableColumnWidths();
  const { selectedNodeIds, setSelectedNodeIds, retainSelectedNodeIds } = useTableSelection();
  const sort = useTableSort(schema.columns);
  const {
    toggledNodeIds: expandedToggledNodeIds,
    toggleNodeExpanded,
    retainToggledNodeIds: retainExpandedToggledNodeIds,
  } = useTableExpansion();
  const { toggledNodeIds, toggleNode, retainToggledNodeIds } = useTableTree();

  const runtimeInput = React.useMemo(
    () => ({
      rows: props.data.nodes,
      columns: schema.columns,
      selectionEnabled: isSelectionEnabled,
      selectedNodeIds,
      emptyLineEnabled: schema.hasEmpty,
      expandedLineEnabled: schema.hasExpand,
      expandedDefaultExpanded: schema.renderRegistry.getExpandDefaultExpanded(),
      expandedToggledNodeIds,
      columnWidths,
      tree:
        isTreeEnabled && treeAccessor !== undefined
          ? {
              enabled: true,
              accessor: treeAccessor,
              defaultExpanded: treeDefaultExpanded,
              toggledNodeIds,
            }
          : undefined,
      sort: sort.snapshot,
    }),
    [
      expandedToggledNodeIds,
      columnWidths,
      isSelectionEnabled,
      isTreeEnabled,
      props.data.nodes,
      schema.columns,
      schema.hasEmpty,
      schema.hasExpand,
      schema.renderRegistry,
      selectedNodeIds,
      sort.snapshot,
      treeAccessor,
      treeDefaultExpanded,
      toggledNodeIds,
    ],
  );

  const snapshot = React.useMemo(() => {
    const runtime = runtimeRef.current;

    if (!runtime) {
      return {
        nodeIds: [],
        columns: [],
        columnLayouts: [],
        gridTemplateColumns: '',
        selection: {
          allSelected: false,
          indeterminate: false,
          selectedNodeIds: [],
        },
        expansion: {
          expandedNodeIds: [],
        },
        lines: [],
      };
    }

    return runtime.createSnapshot(runtimeInput);
  }, [runtimeInput]);

  React.useEffect(() => {
    retainSelectedNodeIds(snapshot.selection.selectedNodeIds);
    retainExpandedToggledNodeIds(snapshot.nodeIds);
    retainToggledNodeIds(snapshot.nodeIds);
  }, [
    retainExpandedToggledNodeIds,
    retainSelectedNodeIds,
    retainToggledNodeIds,
    snapshot.nodeIds,
    snapshot.selection.selectedNodeIds,
  ]);

  const expandedNodeIdSet = React.useMemo(
    () => new Set(snapshot.expansion.expandedNodeIds),
    [snapshot.expansion.expandedNodeIds],
  );

  const isNodeExpanded = React.useCallback(
    (nodeId: TableNodeId): boolean => expandedNodeIdSet.has(nodeId),
    [expandedNodeIdSet],
  );

  const handleRowToggle = React.useCallback(
    (nodeId: TableNodeId) => {
      const runtime = runtimeRef.current;

      if (!runtime || !isSelectionEnabled) return;

      const nextSelectedNodeIds = runtime.toggleNodeSelection(
        runtimeInput.selectedNodeIds ?? [],
        nodeId,
        runtimeInput.tree,
      );
      const selectedRows = runtime.getSelectedRows(nextSelectedNodeIds);

      setSelectedNodeIds(nextSelectedNodeIds);
      selectionOnSelect?.(selectedRows);
    },
    [isSelectionEnabled, runtimeInput, selectionOnSelect, setSelectedNodeIds],
  );

  const handleAllRowsToggle = React.useCallback(() => {
    const runtime = runtimeRef.current;

    if (!runtime || !isSelectionEnabled) return;

    const nextSelectedNodeIds = runtime.toggleAllNodesSelection(runtimeInput.selectedNodeIds ?? [], runtimeInput.tree);
    const selectedRows = runtime.getSelectedRows(nextSelectedNodeIds);

    setSelectedNodeIds(nextSelectedNodeIds);
    selectionOnSelect?.(selectedRows);
  }, [isSelectionEnabled, runtimeInput, selectionOnSelect, setSelectedNodeIds]);

  const handleTreeNodeToggle = React.useCallback(
    (nodeId: TableNodeId) => {
      const runtime = runtimeRef.current;
      const isExpanded = isTreeNodeExpanded(nodeId, runtimeInput.tree?.defaultExpanded, toggledNodeIds);

      if (runtime && isSelectionEnabled && isExpanded) {
        const nextSelectedNodeIds = runtime.clearPartialNodeSubtreeSelection(
          runtimeInput.selectedNodeIds ?? [],
          nodeId,
        );

        if (nextSelectedNodeIds !== runtimeInput.selectedNodeIds) {
          const selectedRows = runtime.getSelectedRows(nextSelectedNodeIds);

          setSelectedNodeIds(nextSelectedNodeIds);
          selectionOnSelect?.(selectedRows);
        }
      }

      toggleNode(nodeId);
    },
    [
      isSelectionEnabled,
      runtimeInput.selectedNodeIds,
      runtimeInput.tree?.defaultExpanded,
      selectionOnSelect,
      setSelectedNodeIds,
      toggledNodeIds,
      toggleNode,
    ],
  );

  const rowEventContext = React.useMemo(
    () => ({
      getContext: (line: TableDataLineSnapshot<T>) => ({
        expansion: schema.hasExpand
          ? {
              expanded: isNodeExpanded(line.node.nodeId),
              toggle: () => toggleNodeExpanded(line.node.nodeId),
            }
          : undefined,
        tree:
          isTreeEnabled && line.node.hasChildren
            ? {
                expanded: isTreeNodeExpanded(line.node.nodeId, treeDefaultExpanded, toggledNodeIds),
                hasChildren: line.node.hasChildren,
                depth: line.node.depth,
                parentNodeId: line.node.parentNodeId,
                toggle: () => handleTreeNodeToggle(line.node.nodeId),
              }
            : undefined,
        selection: isSelectionEnabled
          ? {
              selected: line.selected,
              indeterminate: line.selectionIndeterminate,
              toggle: () => handleRowToggle(line.node.nodeId),
            }
          : undefined,
      }),
    }),
    [
      handleRowToggle,
      handleTreeNodeToggle,
      isNodeExpanded,
      isSelectionEnabled,
      isTreeEnabled,
      schema.hasExpand,
      toggleNodeExpanded,
      toggledNodeIds,
      treeDefaultExpanded,
    ],
  );
  const rowEvents = useTableRowEvents(props.row, rowEventContext);

  const renderCell = React.useCallback(
    (cell: TableCellSnapshot<T>): React.ReactNode => {
      return schema.renderRegistry.renderCell(cell);
    },
    [schema],
  );

  const createCell = React.useCallback(
    (
      line: TableDataLineSnapshot<T>,
      column: TableColumnModel<React.ReactNode, React.ReactNode>,
      columnIndex: number,
    ): TableCellSnapshot<T> => {
      const cellRuntime = cellRuntimeRef.current;

      if (!cellRuntime) {
        throw new Error('Table cell runtime is not initialized.');
      }

      return cellRuntime.createCell(line.node, line.id, line.selected, column, columnIndex);
    },
    [],
  );

  const renderEmpty = React.useCallback((): React.ReactNode => {
    return schema.renderRegistry.renderEmpty();
  }, [schema]);

  const renderExpanded = React.useCallback(
    (line: TableExpandedLineSnapshot<T>): React.ReactNode => {
      return schema.renderRegistry.renderExpanded(line.render);
    },
    [schema],
  );

  return (
    <TableView
      snapshot={snapshot}
      surface={props.surface ?? 'standalone'}
      layout={layout}
      tableStyle={props.style ?? 'primary'}
      size={props.size ?? 'lg'}
      className={props.className}
      setColumnElement={setColumnElement}
      isRowInteractive={rowEvents.isRowInteractive}
      createCell={createCell}
      renderCell={renderCell}
      renderEmpty={renderEmpty}
      renderExpanded={renderExpanded}
      onAllRowsToggle={handleAllRowsToggle}
      onNodeToggle={handleRowToggle}
      isNodeExpanded={isNodeExpanded}
      onNodeExpandedToggle={toggleNodeExpanded}
      isTreeEnabled={isTreeEnabled}
      isTreeDefaultExpanded={Boolean(treeDefaultExpanded)}
      treeToggledNodeIds={toggledNodeIds}
      onTreeNodeToggle={handleTreeNodeToggle}
      onColumnSortToggle={sort.onColumnSortToggle}
      lastRowTrigger={props.lastRowTrigger}
      onRowClick={rowEvents.onRowClick}
      onRowDoubleClick={rowEvents.onRowDoubleClick}
      onRowContextMenu={rowEvents.onRowContextMenu}
    />
  );
};

type TableCompound = typeof TableComponent & {
  Column: typeof Column;
  Head: typeof Head;
  Cell: typeof Cell;
  Empty: typeof Empty;
  Expand: typeof Expand;
  ExpandTrigger: typeof ExpandTrigger;
};

export const Table: TableCompound = Object.assign(TableComponent, {
  Column,
  Head,
  Cell,
  Empty,
  Expand,
  ExpandTrigger,
});
