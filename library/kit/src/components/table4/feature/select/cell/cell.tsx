import React from 'react';

import { Checkbox } from '../../../../symbols';

import { useSelectContext } from '../select.context.ts';
import type { INode } from '../../../table.tsx';

interface IRowCheckboxProps<T> {
  item: INode<T>;
}

export const Cell = <T,>(props: IRowCheckboxProps<T>) => {
  const { addItem, deleteItem, hasSelected } = useSelectContext<INode<T>>();

  return (
    <Checkbox
      size={'sm'}
      checked={hasSelected(props.item)}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.checked) {
          addItem(props.item);
        } else {
          deleteItem(props.item);
        }
      }}
    />
  );
};
