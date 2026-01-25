import React from 'react';

import { Icon } from '../../icon';

import cn from 'classnames';
import s from './default.module.scss';

export interface IProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  size?: 'sm' | 'md';
  isIndeterminate?: boolean;
}

export const Element: React.FC<IProps> = ({ size = 'md', isIndeterminate, ...props }) => {
  const classNameInput = React.useMemo(
    () =>
      cn(
        s.wrapper,
        {
          [s['size--medium']]: size === 'md',
          [s['size--small']]: size === 'sm',
        },
        {
          [s.indeterminate]: isIndeterminate,
          [s.disabled]: props.disabled,
        },
      ),
    [size, props.checked, props.disabled, isIndeterminate],
  );

  return (
    <div className={s.container}>
      <input {...props} type={'checkbox'} className={s.input} />
      <div className={classNameInput}>
        <span className={s.icon}>{isIndeterminate ? <Icon icon={'subtract-fill'} /> : <Icon icon={'check-fill'} />}</span>
      </div>
    </div>
  );
};
