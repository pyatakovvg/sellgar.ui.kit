import React from 'react';

import { Icon } from '../icon';
import type { TIconName } from '../icon';

import { Heading, Text } from '../../typography';

import cn from 'classnames';
import s from './default.module.scss';

interface IProps {
  isActive?: boolean;
  leadicon?: TIconName;
  title: string;
}

export const Container: React.FC<React.PropsWithChildren<IProps>> = (props) => {
  const className = React.useMemo(
    () =>
      cn(s.wrapper, {
        [s.active]: props.isActive,
      }),
    [props.isActive],
  );

  return (
    <div className={className}>
      {props.leadicon && (
        <div className={s.icon}>
          <Icon icon={props.leadicon} />
        </div>
      )}
      <div className={s.container}>
        <div className={s.header}>
          <Heading className={s['header--text']} variant={'h6'}>
            <h6>{props.title}</h6>
          </Heading>
        </div>
        <div className={s.content}>
          <Text className={s['content--text']}>
            <p>{props.children}</p>
          </Text>
        </div>
      </div>
    </div>
  );
};
