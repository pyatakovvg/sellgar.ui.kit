import { useContext } from '../table.context.ts';

export const useGetPinnedStyles = <T>(columnIndex: number) => {
  const { columns, columnsWidth } = useContext();

  if (columnsWidth.length === 0) return {};

  const column = columns[columnIndex];

  if (!column) return {};

  if (!column.pinLeft && !column.pinRight) return {};

  let position = 0;

  if (column.pinLeft) {
    for (let i = 0; i < columnIndex; i++) {
      if (columns[i].pinLeft) {
        position += columnsWidth[i] || 0;
      }
    }
    return {
      left: `${position}px`,
      zIndex: 10,
    };
  }

  if (column.pinRight) {
    for (let i = columnIndex + 1; i < columns.length; i++) {
      if (columns[i].pinRight) {
        position += columnsWidth[i] || 0;
      }
    }
    return {
      right: `${position}px`,
      zIndex: 10,
    };
  }

  return {};
};
