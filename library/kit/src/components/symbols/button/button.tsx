import React from 'react';

import { Icon, type TIconName } from '../icon';

import cn from 'classnames';
import s from './default.module.scss';

interface IProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'style'> {
  form?: 'icon-only';
  style?: 'primary' | 'secondary' | 'tertiary' | 'ghost';
  size?: 'lg' | 'md' | 'sm' | 'xs';
  target?: 'destructive';
  shape?: 'rounded' | 'pill';
  leadicon?: TIconName;
  tailicon?: TIconName;
  label?: string | number;
}

export const Button: React.FC<IProps> = ({
  size = 'md',
  style = 'primary',
  shape = 'rounded',
  target,
  leadicon,
  tailicon,
  label,
  ...props
}) => {
  const classNameButton = React.useMemo(
    () =>
      cn(
        s.wrapper,
        {
          [s['size--large']]: size === 'lg',
          [s['size--medium']]: size === 'md',
          [s['size--small']]: size === 'sm',
          [s['size--extra-small']]: size === 'xs',
        },
        {
          [s['style--primary']]: style === 'primary',
          [s['style--secondary']]: style === 'secondary',
          [s['style--tertiary']]: style === 'tertiary',
          [s['style--ghost']]: style === 'ghost',
        },
        {
          [s['target--destructive']]: target === 'destructive',
        },
        {
          [s['shape--rounded']]: shape === 'rounded',
          [s['shape--pill']]: shape === 'pill',
        },
      ),
    [size, style, target, shape],
  );

  return (
    <button {...props} className={classNameButton}>
      {leadicon && (
        <div className={s['lead-icon']}>
          <Icon icon={leadicon} />
        </div>
      )}
      <div className={s.text}>{props.children}</div>
      {label && (
        <div className={s.badge}>
          <span className={s.label}>{label}</span>
        </div>
      )}
      {tailicon && (
        <div className={s['tail-icon']}>
          <Icon icon={tailicon} />
        </div>
      )}
    </button>
  );
};
