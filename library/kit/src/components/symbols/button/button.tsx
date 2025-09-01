import React from 'react';

import cn from 'classnames';
import s from './default.module.scss';

interface IProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'style'> {
  form?: 'icon-only';
  style?: 'primary' | 'secondary' | 'tertiary' | 'ghost';
  size?: 'lg' | 'md' | 'sm' | 'xs';
  target?: 'default' | 'destructive' | 'success' | 'info';
  shape?: 'rounded' | 'pill';
  leadIcon?: React.ReactNode;
  tailIcon?: React.ReactNode;
  badge?: React.ReactNode;
}

const useBadgeSize = (size: IProps['size']) => {
  return React.useMemo(() => {
    switch (size) {
      case 'lg':
        return 'md';
      case 'md':
      case 'sm':
        return 'sm';
      case 'xs':
        return 'xs';
    }
  }, [size]);
};

const useBadgeColor = (style: IProps['style'], target: IProps['target']) => {
  return React.useMemo(() => {
    switch (target) {
      case 'default':
        switch (style) {
          case 'primary':
            return 'white';
          case 'secondary':
            return 'gray';
          case 'tertiary':
            return 'white';
          case 'ghost':
            return 'gray';
        }
      case 'destructive':
        switch (style) {
          case 'primary':
            return 'white-destructive';
          case 'secondary':
          case 'tertiary':
          case 'ghost':
            return 'surface-destructive';
        }
      case 'info':
        switch (style) {
          case 'primary':
            return 'white-info';
          case 'secondary':
          case 'tertiary':
          case 'ghost':
            return 'surface-info';
        }
      case 'success':
        switch (style) {
          case 'primary':
            return 'white-success';
          case 'secondary':
          case 'tertiary':
          case 'ghost':
            return 'surface-success';
        }
    }
  }, [style, target]);
};

const useBadgeStroke = (style: IProps['style']) => {
  return React.useMemo(() => {
    switch (style) {
      case 'primary':
        return false;
      case 'secondary':
        return true;
      case 'tertiary':
        return true;
      case 'ghost':
        return true;
    }
  }, [style]);
};

export const Button: React.FC<IProps> = ({ size = 'md', style = 'primary', shape = 'rounded', target = 'default', leadIcon, tailIcon, badge, ...props }) => {
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
          [s['target--info']]: target === 'info',
          [s['target--success']]: target === 'success',
          [s['target--destructive']]: target === 'destructive',
        },
        {
          [s['shape--rounded']]: shape === 'rounded',
          [s['shape--pill']]: shape === 'pill',
        },
      ),
    [size, style, target, shape],
  );

  const badgeSize = useBadgeSize(size);
  const badgeColor = useBadgeColor(style, target);
  const badgeStroke = useBadgeStroke(style);

  return (
    <button {...props} className={classNameButton}>
      {leadIcon && <div className={s['lead-icon']}>{leadIcon}</div>}
      <div className={s.text}>{props.children}</div>
      {badge && (
        <div className={s.badge}>
          {React.Children.map(badge, (child) => {
            if (React.isValidElement(child)) {
              const childElement = child as React.ReactElement<any>;
              return React.cloneElement(childElement, {
                size: badgeSize,
                color: badgeColor,
                stroke: badgeStroke,
                disabled: props.disabled,
              });
            }
            return child;
          })}
        </div>
      )}
      {tailIcon && <div className={s['tail-icon']}>{tailIcon}</div>}
    </button>
  );
};
