import React from 'react';

import { Typography } from '../typography';

import s from './default.module.scss';

export interface IProps {
  label: string;
  caption?: string;
  required?: boolean;
}

export const LabelField: React.FC<IProps> = (props) => {
  return (
    <div className={s.wrapper}>
      <div className={s.label}>
        <Typography size={'caption-l'} weight={'medium'}>
          <p>{props.label}</p>
        </Typography>
      </div>
      {props.caption && (
        <div className={s.caption}>
          <Typography size={'caption-l'} weight={'regular'}>
            <p>{props.caption}</p>
          </Typography>
        </div>
      )}
      {props.required && (
        <div className={s.required}>
          <Typography size={'caption-l'} weight={'regular'}>
            <p>*</p>
          </Typography>
        </div>
      )}
    </div>
  );
};
