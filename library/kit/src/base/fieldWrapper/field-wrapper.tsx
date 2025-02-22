import React from 'react';

import cn from 'classnames';
import s from './default.module.scss';

interface IProps {
  isActive?: boolean;
  disabled?: boolean;
  variant?: 'success' | 'destructive';
}

export const FieldWrapper: React.FC<React.PropsWithChildren<IProps>> = (props) => {
  const className = React.useMemo(
    () =>
      cn(
        s.wrapper,
        {
          [s['variant--destructive']]: props.variant === 'destructive',
        },
        {
          [s['active']]: props.isActive,
        },
        {
          [s['disabled']]: props.disabled,
        },
      ),
    [props.variant, props.isActive, props.disabled],
  );

  return <div className={className}>{props.children}</div>;
};
