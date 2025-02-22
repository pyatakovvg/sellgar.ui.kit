import React from 'react';

import { Description } from '../../../typography';

import s from './default.module.scss';

export interface IProps {
  required?: boolean;
  text: string;
  optionaltext?: string;
}

export const Label: React.FC<IProps> = (props) => {
  return (
    <div className={s.wrapper}>
      <div className={s.content}>
        <Description variant={'large'} className={s['content-color']}>
          <span>{props.text}</span>
        </Description>
        {props.optionaltext && (
          <Description className={s.optionat}>
            <span>{props.optionaltext}</span>
          </Description>
        )}
      </div>
      {props.required && (
        <div className={s.required}>
          <Description variant={'large'} className={s['required-color']}>
            <span>*</span>
          </Description>
        </div>
      )}
    </div>
  );
};
