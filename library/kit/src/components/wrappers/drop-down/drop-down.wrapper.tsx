import React from 'react';

import { Scrollbar } from '../scrollbar';

import s from './default.module.scss';

interface IProps extends React.HTMLAttributes<Omit<HTMLDivElement, 'className'>> {
  ref?: React.RefCallback<HTMLDivElement>;
}

export const DropDownWrapper: React.FC<React.PropsWithChildren<IProps>> = ({ ref, ...props }) => {
  return (
    <Scrollbar className={s.wrapper} {...props} ref={ref}>
      {props.children}
    </Scrollbar>
  );
};
