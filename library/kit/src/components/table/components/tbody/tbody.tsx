import React from 'react';

import { useTableContext } from '../../table.context.ts';
import { useRowEventsContext } from '../../feature/row-events';

import { Cell } from './cell';
import { CellContext } from './cell/cell.context.ts';

import cn from 'classnames';
import s from './default.module.scss';

export const TBody = <T,>() => {
  const { data, columns, expand, empty, lastRowTrigger, row } = useTableContext<T>('TBody');
  const { onRowClick, onRowDoubleClick, onRowContextMenu } = useRowEventsContext<T>('TBody');
  const lastCellRef = React.useRef<HTMLTableCellElement | null>(null);
  const lastTriggeredKeyRef = React.useRef<string | null>(null);
  const hasRowHandlers = React.useMemo(() => {
    const handlers = row?.handlers;
    if (!handlers) return false;
    return !!(handlers.click || handlers.doubleClick || handlers.contextMenu);
  }, [row?.handlers]);

  React.useEffect(() => {
    if (!lastRowTrigger || data.nodes.length === 0) return;

    const lastNode = data.nodes[data.nodes.length - 1];
    const lastCell = lastCellRef.current;

    if (!lastCell || !lastNode) return;

    const triggerKey = `${String(lastNode.id)}:${data.nodes.length}`;
    const autoRootMargin = `0px 0px ${Math.ceil(lastCell.getBoundingClientRect().height)}px 0px`;
    const observer = new IntersectionObserver(
      (entries) => {
        const firstEntry = entries[0];
        if (!firstEntry?.isIntersecting) return;
        if (lastTriggeredKeyRef.current === triggerKey) return;

        lastTriggeredKeyRef.current = triggerKey;
        lastRowTrigger.onLastRowVisible(lastNode.data);
      },
      {
        root: null,
        rootMargin: lastRowTrigger.rootMargin != null ? `0px 0px ${lastRowTrigger.rootMargin}px 0px` : autoRootMargin,
        threshold: lastRowTrigger.threshold ?? 0,
      },
    );

    observer.observe(lastCell);

    return () => {
      observer.disconnect();
    };
  }, [data.nodes, lastRowTrigger]);

  if (data.nodes.length === 0) {
    if (!empty) {
      return <tbody className={s.body} />;
    }

    return (
      <tbody className={s.body}>
        <tr className={s.emptyRow}>
          <td className={s.emptyCell} colSpan={Math.max(columns.length, 1)}>
            {empty.renderEmpty()}
          </td>
        </tr>
      </tbody>
    );
  }

  return (
    <tbody className={s.body}>
      {data.nodes.map((node, index) => {
        const isExpanded = expand ? expand.isExpanded(node.id) : false;
        const isLastRow = index === data.nodes.length - 1;

        return (
          <React.Fragment key={node.id ?? index}>
            <tr className={cn(s.row, { [s.rowHoverable]: hasRowHandlers })}>
              {columns.map((column, cellIndex) => {
                const originalIndex = columns.indexOf(column);
                const isTriggerCell = isLastRow && cellIndex === 0;

                return (
                  <Cell<T>
                    key={cellIndex}
                    originIndex={originalIndex}
                    align={column.align}
                    data={node}
                    collapse={column.collapse}
                    className={column.cellClassName}
                    cellRef={isTriggerCell ? lastCellRef : undefined}
                    onClick={(event) => onRowClick(event, node.data, node.id, index)}
                    onDoubleClick={(event) => onRowDoubleClick(event, node.data, node.id, index)}
                    onContextMenu={(event) => onRowContextMenu(event, node.data, node.id, index)}
                  >
                    {column.renderCell(node)}
                  </Cell>
                );
              })}
            </tr>
            {expand && isExpanded && (
              <tr className={s.expandRow}>
                <td className={s.expandCell} colSpan={columns.length}>
                  <CellContext.Provider value={node}>{expand.renderExpanded(node.data)}</CellContext.Provider>
                </td>
              </tr>
            )}
          </React.Fragment>
        );
      })}
    </tbody>
  );
};
