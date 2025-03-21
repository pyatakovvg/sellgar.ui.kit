import React from 'react';

import { Icon } from '../icon';
import { Animate } from '../../helpers/animate';

import s from './default.module.scss';

export const Spinner: React.FC = () => {
  return (
    <Animate.Spin>
      <span className={s.wrapper}>
        <Icon icon={'loader-4-fill'} />
      </span>
    </Animate.Spin>
  );
};
