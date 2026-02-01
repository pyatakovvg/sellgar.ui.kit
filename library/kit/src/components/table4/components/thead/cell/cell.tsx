import React from 'react';

import { Typography } from '../../../../symbols';
import { useContext as useSortContext, Arrow } from '../../../feature/sort';

import { useGetPinnedStyles } from '../../get-pinned-styles.hook.ts';

import type { ISort } from '../../../configuration/column';

import cn from 'classnames';
import s from './default.module.scss';

interface IProps {
  originIndex: number;
  align?: 'left' | 'center' | 'right';
  collapse?: boolean;
  sort?: ISort;
}

export const Cell = (props: React.PropsWithChildren<IProps>) => {
  const styles = useGetPinnedStyles(props.originIndex);

  const { onToggle } = useSortContext();

  const titleClassName = React.useMemo(
    () =>
      cn(
        s.title,
        {
          [s.collapse]: props.collapse ?? false,
        },
        {
          [s.hovered]: props.sort ?? false,
        },
      ),
    [props.sort],
  );

  const cellClassName = React.useMemo(
    () =>
      cn(s.cellContent, {
        [s['align--right']]: props.align === 'right',
        [s['align--center']]: props.align === 'center',
      }),
    [props.align, props.collapse],
  );

  return (
    <th align={props.align} className={titleClassName} style={{ ...styles, zIndex: (styles?.zIndex ?? 0) + 10 }} onClick={onToggle}>
      <div className={cellClassName}>
        {React.isValidElement(props.children) ? (
          props.children
        ) : (
          <Typography size={'caption-l'}>
            <p>{props.children}</p>
          </Typography>
        )}
      </div>
      {props.sort && (
        <div className={s.arrow}>
          <Arrow />
        </div>
      )}
    </th>
  );
};
