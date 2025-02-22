import React from 'react';

import { Icon } from '../icon';
import type { TIconName } from '../icon';

import s from './default.module.scss';

interface IProps {
  leadicon: TIconName;
}

export const Chip: React.FC<React.PropsWithChildren<IProps>> = (props) => {
  return (
    <div className={s.wrapper}>
      <div className={s['lead-icon']}>
        <Icon icon={props.leadicon} />
      </div>
      <div className={s.content}>{props.children}</div>
    </div>
  );
};
