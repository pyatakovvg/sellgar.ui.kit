import React from 'react';

import { createContext } from './sort.context.ts';

interface IProps {
  directionDefault?: 'asc' | 'desc';
  onToggle?(direction?: 'asc' | 'desc'): void;
}

export const SortProvider = (props: React.PropsWithChildren<IProps>) => {
  const context = createContext();

  const [init, setInit] = React.useState(false);
  const [direction, setDirection] = React.useState<'asc' | 'desc' | undefined>(() => props.directionDefault);

  const handleDirection = () => {
    if (!direction) {
      setDirection('asc');
    } else if (direction === 'asc') {
      setDirection('desc');
    } else if (direction === 'desc') {
      setDirection(undefined);
    }
  };

  React.useEffect(() => {
    if (!init) {
      setInit(true);
      return;
    }

    props.onToggle?.(direction);
  }, [direction]);

  return (
    <context.Provider
      value={{
        direction,
        onToggle: handleDirection,
      }}
    >
      {props.children}
    </context.Provider>
  );
};
