import React from 'react';

import { type IConfigColumn } from './create-columns-config.ts';

export const useGetColumnsWidth = <T>(tableRef: React.RefObject<HTMLTableElement | null>, config: IConfigColumn<T>[]) => {
  const [columnWidths, setColumnWidths] = React.useState<number[]>([]);
  const resizeObserverRef = React.useRef<ResizeObserver | null>(null);

  React.useEffect(() => {
    if (!tableRef.current) return;

    const updateColumnWidths = () => {
      const table = tableRef.current;

      if (!table) return;

      const headers = table.querySelectorAll('thead th');
      const widths = Array.from(headers).map((header) => header.getBoundingClientRect().width);

      setColumnWidths(widths);
    };

    resizeObserverRef.current = new ResizeObserver(updateColumnWidths);
    resizeObserverRef.current.observe(tableRef.current);

    updateColumnWidths();

    return () => {
      resizeObserverRef.current?.disconnect();
    };
  }, [config]);

  return columnWidths;
};
