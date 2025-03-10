import React from 'react';

import { Icon } from '../../icon';
import { Typography } from '../../typography';

import s from './default.module.scss';

interface IProps {
  year: number;
  month: string;
  onPrevMonthClick: () => void;
  onNextMonthClick: () => void;
}

export const Header: React.FC<IProps> = (props) => {
  return (
    <div className={s.wrapper}>
      <div className={s.content}>
        <Typography size={'caption-l'} weight={'semi-bold'}>
          <p>
            {props.month} {props.year}
          </p>
        </Typography>
      </div>
      <div className={s.controls}>
        <div className={s.icon} onClick={() => props.onPrevMonthClick()}>
          <Icon icon={'arrow-left-s-line'} />
        </div>
        <div className={s.icon} onClick={() => props.onNextMonthClick()}>
          <Icon icon={'arrow-right-s-line'} />
        </div>
      </div>
    </div>
  );
};
