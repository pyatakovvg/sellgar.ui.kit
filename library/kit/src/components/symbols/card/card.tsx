import React from 'react';

import cn from 'classnames';
import s from './default.module.scss';

interface IProps {
  type?: 'custom' | 'elevated' | 'flat';
  image?: React.ReactNode;
  alignment?: 'image-first' | 'content-first';
}

export const Card: React.FC<React.PropsWithChildren<IProps>> = ({
  type = 'custom',
  alignment = 'image-first',
  image,
  ...props
}) => {
  const className = React.useMemo(
    () =>
      cn(
        s.wrapper,
        {
          [s['type--custom']]: type === 'custom',
          [s['type--elevated']]: type === 'elevated',
          [s['type--flat']]: type === 'flat',
        },
        {
          [s['alignment--image-first']]: alignment === 'image-first',
          [s['alignment--content-first']]: alignment === 'content-first',
        },
      ),
    [type, alignment],
  );

  return (
    <div className={className}>
      {image && type !== 'custom' && <div className={s.image}>{image}</div>}
      <div className={s.content}>{props.children}</div>
    </div>
  );
};
