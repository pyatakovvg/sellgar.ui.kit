import React from 'react';

import { Icon, TIconName } from '../icon';
import { Typography } from '../typography';

import cn from 'classnames';
import s from './default.module.scss';

interface IProps {
  size?: 'sm' | 'md';
  active?: boolean;
  showdivider?: boolean;
  divider?: '>' | '/';
  leadicon?: TIconName;
  tailicon?: TIconName;
  label: string;
}

export const Breadcrumb: React.FC<IProps> = ({
  active = false,
  size = 'sm',
  showdivider = false,
  divider = '>',
  ...props
}) => {
  const leadIconClassName = React.useMemo(
    () =>
      cn(
        s['lead-icon'],
        {
          [s['size--sm']]: size === 'sm',
          [s['size--md']]: size === 'md',
        },
        {
          [s.active]: active,
        },
      ),
    [props.leadicon, size, active],
  );
  const tailIconClassName = React.useMemo(
    () =>
      cn(
        s['tail-icon'],
        {
          [s['size--sm']]: size === 'sm',
          [s['size--md']]: size === 'md',
        },
        {
          [s.active]: active,
        },
      ),
    [props.leadicon, size, active],
  );
  const dividerIconClassName = React.useMemo(
    () =>
      cn(
        s['divider'],
        {
          [s['size--sm']]: size === 'sm',
          [s['size--md']]: size === 'md',
        },
        {
          [s.active]: active,
        },
      ),
    [props.leadicon, size, active],
  );
  const labelClassName = React.useMemo(
    () =>
      cn(s['label'], {
        [s.active]: active,
      }),
    [props.leadicon, size, active],
  );

  return (
    <div className={s.wrapper}>
      {props.leadicon && (
        <div className={leadIconClassName}>
          <Icon icon={props.leadicon} />
        </div>
      )}
      <div className={s.label}>
        {size === 'sm' && (
          <Typography size={'caption-m'} weight={'semi-bold'}>
            <span className={labelClassName}>{props.label}</span>
          </Typography>
        )}
        {size === 'md' && (
          <Typography size={'caption-l'} weight={'semi-bold'}>
            <span className={labelClassName}>{props.label}</span>
          </Typography>
        )}
      </div>
      {props.tailicon && (
        <div className={tailIconClassName}>
          <Icon icon={props.tailicon} />
        </div>
      )}
      {showdivider && (
        <div className={dividerIconClassName}>
          <Icon icon={'arrow-right-s-line'} />
        </div>
      )}
    </div>
  );
};
