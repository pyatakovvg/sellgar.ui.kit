import React from 'react';

import { useContext as useTableContext } from '../../../table.context.ts';
import { useCellData } from '../../../components/tbody/cell';

import type { INode } from '../../../table.tsx';

export const useRowExpanded = <T extends INode>(node?: T) => {
  const { expand } = useTableContext<T>();
  const cell = useCellData<T>();

  const resolvedNode = node ?? cell.data;
  const resolvedId = resolvedNode?.id;

  const isExpanded = expand && resolvedId !== undefined ? expand.isExpanded(resolvedId) : false;

  const onToggle = React.useCallback(
    (nextNode?: T) => {
      const target = nextNode ?? resolvedNode;

      if (!expand || !target || target.id === undefined) return;

      expand.toggle(target);
    },
    [expand, resolvedNode],
  );

  return {
    expanded: isExpanded,
    onToggle,
  };
};
