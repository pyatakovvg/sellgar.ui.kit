import type { IData, INode } from '../table.tsx';

const createNode = <T extends { id: string | number }>(item: T, treeAccessor?: keyof T, deps = 0): INode<T> => {
  const node: INode<T> = {
    id: item.id,
    data: item,
    deps,
    meta: null,
  };

  if (treeAccessor) {
    const children = (item as Record<string, unknown>)[treeAccessor as string];
    if (Array.isArray(children)) {
      node.nodes = children.map((child) => createNode(child as T, treeAccessor, deps + 1));
    }
  }

  return node;
};

export const createDataNodes = <T extends { id: string | number }>(data: IData<T>, treeAccessor?: keyof T): IData<INode<T>> => {
  return {
    nodes: data.nodes.map((item) => createNode(item, treeAccessor)),
  };
};
