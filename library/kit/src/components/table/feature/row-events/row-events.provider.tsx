import React from 'react';

import { RowEventsContext } from './row-events.context.ts';

import type { TNodeId } from '../../table.types.ts';
import type { IRowConfig, TRowTrigger } from './row-events.types.ts';

interface IProps<T> {
  config?: IRowConfig<T>;
}

const DOUBLE_CLICK_DELAY_MS = 220;

export const RowEventsProvider = <T,>(props: React.PropsWithChildren<IProps<T>>) => {
  const clickTimeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearPendingClick = React.useCallback(() => {
    if (!clickTimeoutRef.current) return;
    clearTimeout(clickTimeoutRef.current);
    clickTimeoutRef.current = null;
  }, []);

  React.useEffect(() => {
    return () => {
      clearPendingClick();
    };
  }, [clearPendingClick]);

  const isDefaultInteractiveTarget = React.useCallback((target: EventTarget | null) => {
    if (!(target instanceof Element)) return false;
    return !!target.closest('button, a, input, select, textarea, [role="button"], [data-row-event-ignore]');
  }, []);

  const emit = React.useCallback(
    (trigger: TRowTrigger, event: React.MouseEvent<HTMLTableCellElement>, node: T, id: TNodeId, index: number) => {
      const handler = props.config?.handlers?.[trigger];
      if (!handler) return;

      const isInteractiveByDefault = props.config?.disableDefaultInteractiveGuard ? false : isDefaultInteractiveTarget(event.target);
      const isInteractiveByCustom = props.config?.isInteractiveTarget?.(event.target) ?? false;
      if (isInteractiveByDefault || isInteractiveByCustom) return;

      handler({
        node,
        id,
        index,
        trigger,
        nativeEvent: event,
      });
    },
    [isDefaultInteractiveTarget, props.config],
  );

  const onRowClick = React.useCallback(
    (event: React.MouseEvent<HTMLTableCellElement>, node: T, id: TNodeId, index: number) => {
      if (!props.config?.handlers?.click) return;

      if (!props.config.handlers.doubleClick) {
        emit('click', event, node, id, index);
        return;
      }

      clearPendingClick();
      clickTimeoutRef.current = setTimeout(() => {
        emit('click', event, node, id, index);
        clickTimeoutRef.current = null;
      }, DOUBLE_CLICK_DELAY_MS);
    },
    [clearPendingClick, emit, props.config],
  );

  const onRowDoubleClick = React.useCallback(
    (event: React.MouseEvent<HTMLTableCellElement>, node: T, id: TNodeId, index: number) => {
      clearPendingClick();
      emit('doubleClick', event, node, id, index);
    },
    [clearPendingClick, emit],
  );

  const onRowContextMenu = React.useCallback(
    (event: React.MouseEvent<HTMLTableCellElement>, node: T, id: TNodeId, index: number) => {
      clearPendingClick();
      emit('contextMenu', event, node, id, index);
    },
    [clearPendingClick, emit],
  );

  const contextValue = React.useMemo(
    () => ({
      onRowClick,
      onRowDoubleClick,
      onRowContextMenu,
    }),
    [onRowClick, onRowDoubleClick, onRowContextMenu],
  );

  return <RowEventsContext.Provider value={contextValue}>{props.children}</RowEventsContext.Provider>;
};
