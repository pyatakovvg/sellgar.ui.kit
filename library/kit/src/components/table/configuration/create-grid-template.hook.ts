import React from 'react';

import type { IConfigColumn } from './create-columns-config.ts';

export const useCreateTableGridTemplate = <T>(columns: IConfigColumn<T>[]) => {
  return React.useMemo(
    () =>
      columns
        .map((column) => {
          if (typeof column.width === 'number') {
            return `var(--numbers-${column.width})`;
          }
          if (typeof column.width === 'string') return column.width;
          return 'minmax(max-content, auto)';
        })
        .join(' '),
    [columns],
  );
};
