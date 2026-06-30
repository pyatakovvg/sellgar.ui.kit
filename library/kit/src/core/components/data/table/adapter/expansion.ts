import React from 'react';

import { retainTableNodeIdSet } from './node-id-set.ts';

import type { TableNodeId } from '../runtime/types.ts';

export interface TableExpansionAdapter {
  toggledNodeIds: ReadonlySet<TableNodeId>;
  toggleNodeExpanded(nodeId: TableNodeId): void;
  retainToggledNodeIds(nodeIds: readonly TableNodeId[]): void;
}

export const useTableExpansion = (): TableExpansionAdapter => {
  const [toggledNodeIds, setToggledNodeIds] = React.useState<ReadonlySet<TableNodeId>>(() => new Set());

  const retainToggledNodeIds = React.useCallback((nodeIds: readonly TableNodeId[]) => {
    setToggledNodeIds((prevNodeIds) => retainTableNodeIdSet(prevNodeIds, nodeIds));
  }, []);

  const toggleNodeExpanded = React.useCallback((nodeId: TableNodeId) => {
    setToggledNodeIds((prevNodeIds) => {
      const nextNodeIds = new Set(prevNodeIds);

      if (nextNodeIds.has(nodeId)) {
        nextNodeIds.delete(nodeId);
      } else {
        nextNodeIds.add(nodeId);
      }

      return nextNodeIds;
    });
  }, []);

  return {
    toggledNodeIds,
    toggleNodeExpanded,
    retainToggledNodeIds,
  };
};
