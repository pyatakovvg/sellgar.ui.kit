import React from 'react';

import { Checkbox } from '../../../../symbols';

import { useSelectContext } from '../select.context.ts';

export const Head = <T,>() => {
  const { isSelectedAll, isIndeterminate, selectAll, deleteAll } = useSelectContext<T>('SelectHead');

  return (
    <Checkbox
      size={'sm'}
      checked={isSelectedAll}
      isIndeterminate={isIndeterminate}
      onChange={() => {
        if (isIndeterminate) {
          selectAll();
        } else if (isSelectedAll) {
          deleteAll();
        } else {
          selectAll();
        }
      }}
    />
  );
};
