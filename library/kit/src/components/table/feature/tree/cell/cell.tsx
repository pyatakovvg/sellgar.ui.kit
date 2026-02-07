import React from 'react';

import { Icon } from '../../../../symbols';

import { useCellData } from '../../../components/tbody/cell';
import { useTreeContext } from '../tree.context.ts';

import cn from 'classnames';
import s from './default.module.scss';

export const Cell: React.FC = () => {
  const node = useCellData<unknown>('TreeCell');
  const tree = useTreeContext('TreeCell');

  const iconClassName = React.useMemo(() => {
    return cn(s.icon, {
      [s.expanded]: tree.isExpanded(node.id),
    });
  }, [node.id, tree]);

  const hasChildren = tree.hasChildren(node.id);
  if (!hasChildren) return null;

  return (
    <div
      className={s.wrapper}
      onClick={(event) => {
        event.stopPropagation();
        tree.toggle(node.id);
      }}
    >
      <div className={iconClassName}>
        <Icon icon={tree.isExpanded(node.id) ? 'arrow-down-s-fill' : 'arrow-right-s-fill'} />
      </div>
    </div>
  );
};
