import type { IData } from '../table.tsx';
import type { ITableNode, TNodeId } from '../table.types.ts';
import { getFallbackRowId } from '../table.types.ts';

interface ITreeConfig<T> {
  isUse: boolean;
  accessor: keyof T;
}

interface ICreateNodesOptions<T> {
  tree?: ITreeConfig<T>;
  getRowId?(node: T): TNodeId;
}

const getNodeIdFromData = <T,>(node: T, getRowId?: (node: T) => TNodeId): TNodeId | undefined => {
  if (getRowId) return getRowId(node);
  return getFallbackRowId(node);
};

const resolveChildren = <T,>(node: T, tree?: ITreeConfig<T>): T[] => {
  if (!tree?.isUse) return [];
  if (!node || typeof node !== 'object') return [];
  const record = node as Record<string, unknown>;
  const value = record[tree.accessor as string];
  return Array.isArray(value) ? value : [];
};

export const createDataNodes = <T,>(
  data: IData<T>,
  options: ICreateNodesOptions<T>,
): {
  data: IData<ITableNode<T>>;
  nodeIdByData: Map<T, TNodeId>;
  tree?: {
    childrenById: Map<TNodeId, TNodeId[]>;
    parentById: Map<TNodeId, TNodeId | null>;
  };
} => {
  let nextId = 1;
  const nodeIdByData = new Map<T, TNodeId>();
  const nodes: ITableNode<T>[] = [];
  const childrenById = new Map<TNodeId, TNodeId[]>();
  const parentById = new Map<TNodeId, TNodeId | null>();

  const build = (items: T[], deps: number, parentId: TNodeId | null) => {
    const ids: TNodeId[] = [];

    items.forEach((item) => {
      const id = getNodeIdFromData(item, options.getRowId) ?? nextId++;

      nodeIdByData.set(item, id);
      parentById.set(id, parentId);
      ids.push(id);

      nodes.push({
        id,
        data: item,
        deps,
      });

      const children = resolveChildren(item, options.tree);
      if (children.length > 0) {
        const childIds = build(children, deps + 1, id);
        childrenById.set(id, childIds);
      }
    });

    return ids;
  };

  build(data.nodes, 0, null);

  return {
    data: { nodes },
    nodeIdByData,
    tree: options.tree?.isUse
      ? {
          childrenById,
          parentById,
        }
      : undefined,
  };
};
