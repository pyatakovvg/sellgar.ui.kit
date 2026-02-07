import React from 'react';

import { Icon } from '../../../../symbols';

import { useContext } from '../sort.context.ts';

import s from './default.module.scss';

export const Arrow = () => {
  const { direction } = useContext();

  return (
    <div className={s.wrapper}>
      {!direction && <Icon icon={'expand-up-down'} />}
      {direction === 'asc' && <Icon icon={'arrow-up-s-fill'} />}
      {direction === 'desc' && <Icon icon={'arrow-down-s-fill'} />}
    </div>
  );
};
