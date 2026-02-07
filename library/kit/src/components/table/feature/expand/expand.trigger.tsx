import React from 'react';

import { useTableContext } from '../../table.context.ts';
import { useCellData } from '../../components/tbody/cell';

interface IProps {
  children: React.ReactNode;
}

export const ExpandTrigger = (props: IProps) => {
  const { expand } = useTableContext<unknown>('ExpandTrigger');
  const node = useCellData<unknown>('ExpandTrigger');

  if (!expand || !node || node.id === undefined) {
    return <>{props.children}</>;
  }

  const isExpanded = expand.isExpanded(node.id);

  const handleClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    expand.toggleById(node.id);
  };

  return (
    <div role="button" aria-expanded={isExpanded} onClick={handleClick} style={{ display: 'contents' }}>
      {props.children}
    </div>
  );
};
