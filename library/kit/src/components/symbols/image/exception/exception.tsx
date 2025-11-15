import React from 'react';

import { Icon } from '../../icon';

import s from './exception.module.scss';

export const Exception = () => {
  return (
    <div className={s.wrapper}>
      <Icon icon={Icon.errorWarningLine} />
    </div>
  );
};
