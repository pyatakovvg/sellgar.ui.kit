import React from 'react';

import { Icon } from '../../icon';
import { Animate } from '../../../helpers/animate';

import s from './process.module.scss';

export const Process = () => {
  return (
    <div className={s.wrapper}>
      <Animate.Spin>
        <Icon icon={Icon.loader4Line} />
      </Animate.Spin>
    </div>
  );
};
