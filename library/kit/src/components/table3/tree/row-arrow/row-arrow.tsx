import React from 'react';

import { Icon } from '../../../symbols';

import { context } from '../../table-rows/table-row.context.ts';

import cn from 'classnames';
import s from './default.module.scss';

interface IRowCheckboxProps {}

export const RowArrow: React.FC<IRowCheckboxProps> = () => {
  const { data, expanded, setExpanded } = React.useContext(context);

  const iconClassName = React.useMemo(() => {
    return cn(s.icon, {
      [s.expanded]: expanded,
    });
  }, [expanded]);

  if (!data.children || !data.children.length) {
    return null;
  }

  return (
    <div className={s.wrapper} onClick={() => setExpanded(!expanded)}>
      <div className={iconClassName}>
        {/*<Icon icon={expanded ? 'arrow-down-s-fill' : 'arrow-right-s-fill'} />*/}
        <Icon icon={expanded ? 'arrow-down-s-fill' : 'arrow-right-s-fill'} />
      </div>
    </div>
  );
};
