import React from 'react';

import { Icon } from '../../../../symbols';

import s from './default.module.scss';

export const Head: React.FC = () => {
  return (
    <span className={s.wrapper}>
      <Icon icon={'grid-fill'} />
    </span>
  );
};
