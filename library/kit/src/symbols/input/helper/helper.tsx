import React from 'react';

import { Icon } from '../../icon';
import { Description } from '../../../typography';

import cn from 'classnames';
import s from './default.module.scss';

export interface IProps {
  variant?: 'success' | 'destructive';
  text: string;
}

export const Helper: React.FC<IProps> = (props) => {
  const textColorClassName = React.useMemo(
    () =>
      cn({
        [s['text--color']]: !props.variant,
        [s['text-color--success']]: props.variant === 'success',
        [s['text-color--destructive']]: props.variant === 'destructive',
      }),
    [props.variant],
  );

  return (
    <div className={s.wrapper}>
      <div className={s.icon}>
        <Description variant={'large'} className={textColorClassName}>
          <Icon icon={'information-line'} />
        </Description>
      </div>
      <div className={s.content}>
        <Description variant={'large'} className={textColorClassName}>
          <span>{props.text}</span>
        </Description>
      </div>
    </div>
  );
};
