'use client';

import React from 'react';

import { Header } from './header';
import { Text } from '../../typography';

import cn from 'classnames';
import s from './default.module.scss';

interface IProps {
  defaultToggle?: boolean;
  title: string;
}

export const Accordion: React.FC<React.PropsWithChildren<IProps>> = (props) => {
  const [isToggled, setToggled] = React.useState(props.defaultToggle ?? false);
  const accordionClassName = React.useMemo(
    () =>
      cn(s.wrapper, {
        [s.toggled]: isToggled,
      }),
    [isToggled],
  );

  return (
    <div className={accordionClassName} onClick={() => setToggled(!isToggled)}>
      <div className={s.header}>
        <Header isToggled={isToggled}>{props.title}</Header>
      </div>
      {isToggled && (
        <div className={s.content}>
          <Text variant={'compact'}>
            <p>{props.children}</p>
          </Text>
        </div>
      )}
    </div>
  );
};
