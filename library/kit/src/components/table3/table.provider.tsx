import React from 'react';

import { Provider } from './table.context.ts';

interface IProviderProps {
  data: any[];
  onSelect: (items: any[]) => void;
}

export const TableProvider: React.FC<React.PropsWithChildren<IProviderProps>> = (props) => {
  const [isSelectedAll, setSelectedAll] = React.useState(false);
  const [isIndeterminate, setIndeterminate] = React.useState(false);
  const [selectedItems, setSelectedItems] = React.useState<any[]>([]);

  const setRef = React.useRef<Set<any>>(new Set());

  const update = () => {
    const selectedItems = Array.from(setRef.current);

    setSelectedItems(selectedItems);
    props.onSelect(selectedItems);
  };

  const handleAddItem = React.useEffectEvent((item: any) => {
    setRef.current.add(item);
    update();
  });

  const handleDeleteItem = React.useEffectEvent((item: any) => {
    setRef.current.delete(item);
    update();
  });

  const handleAddAll = React.useEffectEvent(() => {
    props.data.forEach((item) => {
      setRef.current.add(item);
    });
    update();
  });

  const handleDeleteAll = React.useEffectEvent(() => {
    props.data.forEach((item) => {
      setRef.current.delete(item);
    });
    update();
  });

  const handleIsSelected = React.useCallback(
    (item: any) => {
      return setRef.current.has(item);
    },
    [selectedItems],
  );

  React.useEffect(() => {
    if (selectedItems.length === props.data.length) {
      setSelectedAll(true);
      setIndeterminate(false);
    } else if (selectedItems.length > 0) {
      setSelectedAll(false);
      setIndeterminate(true);
    } else {
      setSelectedAll(false);
      setIndeterminate(false);
    }
  }, [props.data, selectedItems]);

  return (
    <Provider
      value={{
        isSelectedAll,
        isIndeterminate,
        selectedItems,
        hasSelected: handleIsSelected,
        addItem: handleAddItem,
        deleteItem: handleDeleteItem,
        selectAll: handleAddAll,
        deleteAll: handleDeleteAll,
      }}
    >
      {props.children}
    </Provider>
  );
};
