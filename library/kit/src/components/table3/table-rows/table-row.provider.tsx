import React from 'react';

import { Provider } from './table-row.context.ts';

interface IProps<T> {
  data: T;
  deps: number;
  onCallback(state: boolean): void;
}

export const TableRowProvider = <T,>(props: React.PropsWithChildren<IProps<T>>) => {
  const [expanded, setExpanded] = React.useState<boolean>(false);
  const [selected, setSelected] = React.useState<boolean>(false);

  const handleExpand = () => {
    const newExpanded = !expanded;

    setExpanded(newExpanded);
    props.onCallback(newExpanded);
  };

  const handleSelect = () => {
    setSelected(!selected);
  };

  return (
    <Provider value={{ data: props.data as T, deps: props.deps, expanded, setExpanded: handleExpand, selected, setSelected: handleSelect }}>
      {props.children}
    </Provider>
  );
};
