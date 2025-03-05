import React from 'react';

import { Scrollbar } from '../scrollbar';

import s from './default.module.scss';

interface IProps extends React.HTMLAttributes<Omit<HTMLDivElement, 'className'>> {}

export const DropDownWrapper: React.FC<React.PropsWithChildren<IProps>> = (props) => {
  return (
    <div className={s.wrapper} {...props}>
      <Scrollbar>{props.children}</Scrollbar>
    </div>
  );
};
