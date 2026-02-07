import type { IData, INode } from '../table.tsx';

export const createDataNodes = <T extends INode>(data: IData<T>): IData<T> => {
  return data;
};
