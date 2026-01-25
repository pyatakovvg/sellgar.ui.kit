import React from 'react';

import { Icon } from '../../../symbols';

import { context } from '../../table-rows/table-row.context.ts';

import s from './default.module.scss';

interface IRowCheckboxProps {}

export const RowArrow: React.FC<IRowCheckboxProps> = () => {
  const { data, expanded, setExpanded } = React.useContext(context);

  if (!data.children || !data.children.length) {
    return null;
  }

  return (
    <div className={s.wrapper} onClick={() => setExpanded(!expanded)}>
      <div className={s.icon}>
        <Icon icon={expanded ? 'arrow-down-s-fill' : 'arrow-right-s-fill'} />
      </div>
    </div>
  );
};
