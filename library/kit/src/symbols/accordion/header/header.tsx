import React from 'react';

import { Icon } from '../../icon';

import s from './default.module.scss';

interface IProps {
  isToggled: boolean;
  onClick?: () => void;
}

export const Header: React.FC<React.PropsWithChildren<IProps>> = (props) => {
  return (
    <div className={s.wrapper}>
      <div className={s.label}>
        <p className={s.text}>{props.children}</p>
      </div>
      <div className={s.control} onClick={props.onClick}>
        {props.isToggled ? (
          <span className={s.icon}>
            <Icon icon={'subtract-line'} />
          </span>
        ) : (
          <span className={s.icon}>
            <Icon icon={'add-line'} />
          </span>
        )}
      </div>
    </div>
  );
};
