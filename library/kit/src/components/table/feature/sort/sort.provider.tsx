import React from 'react';

import { createContext } from './sort.context.ts';

interface IProps {
  directionDefault?: 'asc' | 'desc';
  onToggle?(direction?: 'asc' | 'desc'): void;
  isActive?: boolean;
  onActivate?(): void;
  onReset?(): void;
}

export const SortProvider = (props: React.PropsWithChildren<IProps>) => {
  const context = createContext();

  const [init, setInit] = React.useState(false);
  const [direction, setDirection] = React.useState<'asc' | 'desc' | undefined>(() =>
    props.isActive ? props.directionDefault : undefined,
  );
  const prevIsActiveRef = React.useRef<boolean | undefined>(props.isActive);
  const skipToggleRef = React.useRef(false);

  const handleDirection = () => {
    props.onActivate?.();

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

    if (skipToggleRef.current) {
      skipToggleRef.current = false;
      return;
    }

    props.onToggle?.(direction);
  }, [direction]);

  React.useEffect(() => {
    const wasActive = prevIsActiveRef.current;

    if (wasActive && !props.isActive && direction !== undefined) {
      skipToggleRef.current = true;
      setDirection(undefined);
      props.onReset?.();
    }

    prevIsActiveRef.current = props.isActive;
  }, [props.isActive, direction]);

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
