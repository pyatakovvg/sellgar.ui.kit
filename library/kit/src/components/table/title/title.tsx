import { Typography } from '../../symbols';

import React from 'react';

import { context as columnContext } from '../column';

import cn from 'classnames';
import s from './default.module.scss';

export interface IProps {
  data: any;
}

export const Title: React.FC<React.PropsWithChildren> = (props) => {
  const ref = React.useRef(null);
  const [dynamicWidth, setWidth] = React.useState(0);
  const { width, align } = React.use(columnContext);

  const className = React.useMemo(
    () =>
      cn(s.wrapper, {
        [s['align--left']]: align === 'left',
        [s['align--center']]: align === 'center',
        [s['align--right']]: align === 'right',
      }),
    [align],
  );

  React.useEffect(() => {
    const observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const borderBoxSize = entry.borderBoxSize[0];

        setWidth(borderBoxSize.inlineSize);
      }
    });

    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => {
      observer.disconnect();
    };
  }, [ref]);

  return (
    <th ref={ref} className={className} style={{ width }}>
      <div className={s.cell} style={{ width: dynamicWidth }}>
        <div className={s.content}>
          <Typography size={'caption-l'} weight={'medium'}>
            <p className={s.text}>
              {React.Children.map(props.children, (child) => {
                if (React.isValidElement(child)) {
                  return React.cloneElement(child as React.ReactElement<IProps>);
                }
                return child;
              })}
            </p>
          </Typography>
        </div>
      </div>
    </th>
  );
};
