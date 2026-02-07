import { useTableContext } from '../table.context.ts';

export const useGetPinnedStyles = <T>(columnIndex: number) => {
  const { columns, columnsWidth } = useTableContext<T>('useGetPinnedStyles');

  if (columnsWidth.length === 0) return {};

  const column = columns[columnIndex];

  if (!column) return {};

  if (!column.pinLeft && !column.pinRight) return {};

  let position = 0;
  let isLastPinnedUserLeft = false;
  let isLastPinnedUserRight = false;

  const lastPinnedUserLeftIndex = columns.reduce((acc, item, index) => {
    if (item.pinLeft && item.pinSource === 'user') {
      return index;
    }
    return acc;
  }, -1);

  const firstPinnedUserRightIndex = columns.findIndex((item) => item.pinRight && item.pinSource === 'user');

  if (column.pinLeft) {
    for (let i = 0; i < columnIndex; i++) {
      if (columns[i].pinLeft) {
        position += columnsWidth[i] || 0;
      }
    }
    isLastPinnedUserLeft = columnIndex === lastPinnedUserLeftIndex;
    return {
      left: `${position}px`,
      zIndex: 10,
      borderRight: isLastPinnedUserLeft ? 'var(--numbers-3) solid var(--border-base-divider)' : undefined,
    };
  }

  if (column.pinRight) {
    for (let i = columnIndex + 1; i < columns.length; i++) {
      if (columns[i].pinRight) {
        position += columnsWidth[i] || 0;
      }
    }
    isLastPinnedUserRight = columnIndex === firstPinnedUserRightIndex;
    return {
      right: `${position}px`,
      zIndex: 10,
      borderLeft: isLastPinnedUserRight ? 'var(--numbers-3) solid var(--border-base-divider)' : undefined,
    };
  }

  return {};
};
