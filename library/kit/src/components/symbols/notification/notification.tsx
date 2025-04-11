import React from 'react';

import { Icon } from '../icon';
import { Typography } from '../typography';

import cn from 'classnames';
import s from './default.module.scss';

interface IProps {
  style?: 'info' | 'warning' | 'destructive' | 'success';
  title: string;
  description?: React.ReactNode;
  slot?: React.ReactNode;
  onClose?(): void;
}

export const Notification: React.FC<IProps> = ({ style = 'info', ...props }) => {
  const iconClassName = React.useMemo(
    () =>
      cn(s.icon, {
        [s['style--info']]: style === 'info',
        [s['style--warning']]: style === 'warning',
        [s['style--success']]: style === 'success',
        [s['style--destructive']]: style === 'destructive',
      }),
    [style],
  );

  const handleClose = () => {
    props.onClose && props.onClose();
  };

  return (
    <div className={s.wrapper}>
      <div className={s.aside}>
        <div className={iconClassName}>
          <Icon icon={'error-warning-fill'} />
        </div>
      </div>
      <div className={s.content}>
        <div className={s.container}>
          <div className={s.title}>
            <Typography size={'body-s'} weight={'semi-bold'}>
              <p className={s.text}>{props.title}</p>
            </Typography>
          </div>
          <div className={s.close} onClick={handleClose}>
            <Icon icon={'close-line'} />
          </div>
        </div>
        {props.description && (
          <div className={s.description}>
            <Typography size={'caption-l'} weight={'medium'}>
              <p className={s.text}>{props.description}</p>
            </Typography>
          </div>
        )}
        {props.slot && (
          <div className={s.control}>
            {React.Children.map(props.slot, (child) => {
              if (React.isValidElement(child)) {
                return React.cloneElement(child);
              }
              return child;
            })}
          </div>
        )}
      </div>
    </div>
  );
};
