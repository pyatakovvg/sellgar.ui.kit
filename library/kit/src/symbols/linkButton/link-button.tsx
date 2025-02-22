import React from 'react';
import NextLink, { LinkProps } from 'next/link';

import { Icon } from '../icon';
import type { TIconName } from '../icon';

import cn from 'classnames';
import s from './default.module.scss';

interface IProps extends LinkProps {
  className?: string;
  form?: 'icon-only';
  mode?: 'primary' | 'secondary' | 'tertiary' | 'ghost';
  target?: 'destructive';
  shape?: 'rounded' | 'pill';
  leadicon?: TIconName;
  tailicon?: TIconName;
  badge?: string;
}

export const LinkButton: React.FC<React.PropsWithChildren<IProps>> = ({ className, ...props }) => {
  const classNameButton = React.useMemo(() => cn(s.wrapper, className), [className]);

  return (
    <NextLink {...props} className={classNameButton}>
      {props.leadicon && (
        <span className={s['lead-icon']}>
          <Icon icon={props.leadicon} />
        </span>
      )}
      <span className={s.text}>{props.children}</span>
      {props.tailicon && (
        <span className={s['tail-icon']}>
          <Icon icon={props.tailicon} />
        </span>
      )}
    </NextLink>
  );
};
