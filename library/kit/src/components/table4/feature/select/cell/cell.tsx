import React from 'react';

import { Checkbox } from '../../../../symbols';

import { useSelectContext } from '../select.context.ts';

interface IRowCheckboxProps {
  item: any;
}

export const Cell = <T,>(props: IRowCheckboxProps) => {
  const { addItem, deleteItem, hasSelected } = useSelectContext<T>();

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
