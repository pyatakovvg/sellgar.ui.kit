import React from 'react';

import { Provider } from './cell.context.ts';

import { context as rowContext } from '../row';
import { context as columnContext } from '../column';

import s from './default.module.scss';
import cn from 'classnames';

export interface IProps {
  data: any;
}

export const Cell: React.FC<React.PropsWithChildren> = (props) => {
  const { deps, data } = React.use(rowContext);
  const { accessor, pinLeft, pinRight } = React.use(columnContext);

  const ref = React.useRef<HTMLTableCellElement>(null);
  const [pinedLeft, setPinedLeft] = React.useState<string | number>('auto');
  const [pinedRight, setPinedRight] = React.useState<string | number>('auto');

  const className = React.useMemo(
    () =>
      cn(s.wrapper, {
        [s.pined]: pinLeft || pinRight,
      }),
    [pinLeft, pinRight],
  );

  React.useEffect(() => {
    const observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        if (pinLeft) {
          const tableRect = entry.target.closest('table')?.getBoundingClientRect()!;
          const rect = entry.target.getBoundingClientRect();
          setPinedLeft(rect.x - tableRect.x);
        }

        if (pinRight) {
          const tableRect = entry.target.closest('table')?.getBoundingClientRect()!;
          const rect = entry.target.getBoundingClientRect();

          console.log(123, tableRect.right - rect.right);
          setPinedRight(0);
        }
      }
    });

    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => {
      observer.disconnect();
    };
  }, [ref, pinLeft, pinRight]);

  return (
    <Provider value={{ deps, data: accessor ? data[accessor] : data }}>
      <td ref={ref} className={className} style={{ left: pinedLeft, right: pinedRight }}>
        <div className={s.cell}>
          <div className={s.content}>
            {React.Children.map(props.children, (child) => {
              if (React.isValidElement(child)) {
                return React.cloneElement(child as React.ReactElement<React.PropsWithChildren & IProps>, {
                  data: accessor ? data[accessor] : data,
                  children: accessor ? data[accessor] : null,
                });
              }
              return child;
            })}
          </div>
        </div>
      </td>
    </Provider>
  );
};
