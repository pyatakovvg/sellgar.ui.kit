import React from 'react';

import { useTableContext } from '../../../table.context.ts';
import { useCellData } from '../../../components/tbody/cell';

export const useRowExpanded = <T,>(node?: T) => {
  const { expand, resolveNodeId } = useTableContext<T>('useRowExpanded');
  const cell = useCellData<T>('useRowExpanded');

  const resolvedId = node ? resolveNodeId(node) : cell?.id;

  const isExpanded = expand && resolvedId !== undefined ? expand.isExpanded(resolvedId) : false;

  const onToggle = React.useCallback(
    (nextNode?: T) => {
      const targetId = nextNode ? resolveNodeId(nextNode) : resolvedId;

      if (!expand || targetId === undefined) return;

      expand.toggleById(targetId);
    },
    [expand, resolveNodeId, resolvedId],
  );

  return {
    expanded: isExpanded,
    onToggle,
  };
};
