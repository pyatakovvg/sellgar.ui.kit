import React from 'react';

import { useContext as useTableContext } from '../../table.context.ts';
import { useCellData } from '../../components/tbody/cell';

import type { INode } from '../../table.tsx';

interface IProps {
  children: React.ReactNode;
}

export const ExpandTrigger = (props: IProps) => {
  const { expand } = useTableContext<INode>();
  const { data } = useCellData<INode>();

  if (!expand || !data || data.id === undefined) {
    return <>{props.children}</>;
  }

  const isExpanded = expand.isExpanded(data.id);

  const handleClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    expand.toggle(data);
  };

  return (
    <div role="button" aria-expanded={isExpanded} onClick={handleClick} style={{ display: 'contents' }}>
      {props.children}
    </div>
  );
};
