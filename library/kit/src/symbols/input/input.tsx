import React from 'react';

import { type IProps as IBadgeProps } from '../badge';
import { Label, type IProps as ILabelProps } from './label';
import { Helper, type IProps as IHelperProps } from './helper';
import { Element, type IProps as IElementProps } from './element';

import s from './default.module.scss';

interface IProps extends IElementProps {
  label?: ILabelProps;
  helper?: IHelperProps;
  badge?: IBadgeProps;
}

export const Input: React.FC<IProps> = ({ label, helper, variant, leadicon, tailicon, ...props }) => {
  return (
    <label className={s.wrapper}>
      {label?.text && (
        <div className={s.label}>
          <Label {...label} required={props.required} />
        </div>
      )}
      <div className={s.content}>
        <Element leadicon={leadicon} tailicon={tailicon} variant={variant} {...props} />
      </div>
      {helper?.text && (
        <div className={s.description}>
          <Helper {...helper} variant={variant} />
        </div>
      )}
    </label>
  );
};
