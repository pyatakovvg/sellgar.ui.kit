export type TNodeId = string | number;

export interface ITableNode<T> {
  id: TNodeId;
  data: T;
  deps: number;
}

type TUnknownRecord = Record<string, unknown>;

export const toNodeId = (value: unknown): TNodeId | undefined => {
  if (typeof value === 'string' || typeof value === 'number') return value;
  return undefined;
};

export const getFallbackRowId = (node: unknown): TNodeId | undefined => {
  if (!node || typeof node !== 'object') return undefined;
  const record = node as TUnknownRecord;
  return toNodeId(record.id ?? record.uuid);
};
