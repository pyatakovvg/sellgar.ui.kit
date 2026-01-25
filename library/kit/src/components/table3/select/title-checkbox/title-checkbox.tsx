import React from 'react';

import { Checkbox } from '../../../symbols';

import { context } from '../select.context.ts';

export const TitleCheckbox: React.FC = () => {
  const { isSelectedAll, isIndeterminate, selectAll, deleteAll } = React.useContext(context);

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
