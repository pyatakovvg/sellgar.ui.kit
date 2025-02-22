import React from 'react';

import { Description } from '../../typography';
import { Icon, type TIconName } from '../icon';

import cn from 'classnames';
import s from './default.module.scss';

export interface IProps {
  className?: string;
  leadicon?: TIconName;
  teilicon?: TIconName;
  text?: string | number;
  state?: 'disabled';
  size?: 'lg' | 'md' | 'xs';
  color?: 'gray' | 'blue' | 'green' | 'orange' | 'red' | 'purple';
}

export const Badge: React.FC<IProps> = (props) => {
  const className = React.useMemo(
    () =>
      cn(
        s.wrapper,
        props.className,
        {
          [s.disabled]: props.state === 'disabled',
        },
        {
          [s['size--middle']]: props.size === 'md',
          [s['size--extra-small']]: props.size === 'xs',
        },
      ),
    [props.className, props.size],
  );

  return (
    <div className={className}>
      {props.leadicon && (
        <div className={s.icon}>
          <Icon icon={props.leadicon} />
        </div>
      )}
      {props.text && (
        <div className={s.content}>
          <Description className={s.text}>
            <span>{props.text}</span>
          </Description>
        </div>
      )}
      {props.teilicon && (
        <div className={s.icon}>
          <Icon icon={props.teilicon} />
        </div>
      )}
    </div>
  );
};
