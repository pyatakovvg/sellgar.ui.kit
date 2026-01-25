import React from 'react';

import { Checkbox } from '../../../symbols';

import { context } from '../select.context.ts';

interface IRowCheckboxProps {
  item: any;
}

export const RowCheckbox: React.FC<IRowCheckboxProps> = (props) => {
  const { addItem, deleteItem, hasSelected } = React.useContext(context);

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
