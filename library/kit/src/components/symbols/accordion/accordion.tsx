import React from 'react';

import { Typography } from '../typography';
import { Icon, type TIconName } from '../icon';

import { Control } from './control';

import cn from 'classnames';
import s from './default.module.scss';

interface IProps {
  leadicon?: TIconName;
  header: string;
  size?: 'lg' | 'md';
  description?: string;
  defaultState?: boolean;
  expanded?: boolean;
  onState?: (expanded: boolean) => void;
}

export const Accordion: React.FC<React.PropsWithChildren<IProps>> = ({ size = 'lg', ...props }) => {
  const [isExpanded, setExpanded] = React.useState(() => props.defaultState ?? false);
  const className = React.useMemo(
    () =>
      cn(
        s.wrapper,
        {
          [s.expanded]: isExpanded,
        },
        {
          [s['size--large']]: size === 'lg',
          [s['size--medium']]: size === 'md',
        },
      ),
    [isExpanded, size],
  );

  React.useEffect(() => {
    props.onState && props.onState(isExpanded);
  }, [isExpanded]);

  React.useEffect(() => {
    if (props.expanded !== undefined) {
      setExpanded(props.expanded);
    }
  }, [props.expanded]);

  const handleExpand = () => {
    setExpanded(!isExpanded);
  };

  return (
    <div className={className} onClick={handleExpand}>
      {props.leadicon && (
        <div className={s.aside}>
          <div className={s['lead-icon']}>
            <Icon icon={props.leadicon} />
          </div>
        </div>
      )}
      <div className={s.content}>
        <div className={s.header}>
          <Control isExpanded={isExpanded} size={size}>
            {props.header}
          </Control>
        </div>
        {isExpanded && (
          <>
            {props.description && (
              <div className={s.description}>
                <Typography size={size === 'lg' ? 'body-s' : 'caption-l'} weight={'regular'}>
                  <p>{props.description}</p>
                </Typography>
              </div>
            )}
            {props.children && <div className={s.slot}>{props.children}</div>}
          </>
        )}
      </div>
    </div>
  );
};
