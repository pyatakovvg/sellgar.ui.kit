import type React from 'react';

import type { TNodeId } from '../../table.types.ts';

export type TRowTrigger = 'click' | 'doubleClick' | 'contextMenu';

export interface IRowEventPayload<T> {
  node: T;
  id: TNodeId;
  index: number;
  trigger: TRowTrigger;
  nativeEvent: React.MouseEvent<HTMLTableCellElement>;
}

export interface IRowHandlers<T> {
  click?(payload: IRowEventPayload<T>): void;
  doubleClick?(payload: IRowEventPayload<T>): void;
  contextMenu?(payload: IRowEventPayload<T>): void;
}

export interface IRowConfig<T> {
  handlers?: IRowHandlers<T>;
  isInteractiveTarget?(target: EventTarget | null): boolean;
  disableDefaultInteractiveGuard?: boolean;
}
