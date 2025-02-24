import React from 'react';

import { Icon, type TIconName } from '../../icon';

import cn from 'classnames';
import s from './default.module.scss';

export interface IProps {
  leadicon?: TIconName;
  disabled?: boolean;
}

export const Placeholder: React.FC<React.PropsWithChildren<IProps>> = (props) => {
  const classNameButton = React.useMemo(
    () =>
      cn(
        s.wrapper,

        // {
        //   [s['size--large']]: size === 'lg',
        //   [s['size--medium']]: size === 'md',
        //   [s['size--small']]: size === 'sm',
        //   [s['size--extra-small']]: size === 'xs',
        // },
        // {
        //   [s['shape--rounded']]: shape === 'rounded',
        //   [s['shape--pill']]: shape === 'pill',
        // },
        // {
        //   [s['stroke']]: stroke,
        // },
        // {
        //   [s['disabled']]: disabled,
        // },
      ),
    [],
  );

  return (
    <div className={classNameButton}>
      <div className={s.content}>
        <input {...props} className={s.input} />
      </div>
    </div>
  );
};
