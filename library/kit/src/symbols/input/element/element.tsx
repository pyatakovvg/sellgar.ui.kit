'use client';

import React from 'react';

import { Icon, type TIconName } from '../../icon';
import { FieldWrapper } from '../../../base/fieldWrapper';
import { Badge, type IProps as IBageProps } from '../../badge';

import cn from 'classnames';
import s from './default.module.scss';

export interface IProps extends React.InputHTMLAttributes<HTMLInputElement> {
  leadicon?: TIconName;
  tailicon?: TIconName;
  variant?: 'success' | 'destructive';
  badge?: IBageProps;
}

export const Element: React.FC<IProps> = ({ leadicon, tailicon, variant, badge, ...props }) => {
  const [isFocus, setFocus] = React.useState(false);
  const iconClassName = React.useMemo(
    () =>
      cn(s.icon, {
        [s['icon--disabled']]: props.disabled,
      }),
    [props.disabled],
  );

  const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    setFocus(true);
    props.onFocus && props.onFocus(event);
  };

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    setFocus(false);
    props.onBlur && props.onBlur(event);
  };

  return (
    <FieldWrapper isActive={isFocus} variant={variant} disabled={props.disabled}>
      <div className={s.wrapper}>
        {leadicon && (
          <div className={iconClassName}>
            <Icon icon={leadicon} />
          </div>
        )}
        <div className={s.element}>
          <input className={s.input} {...props} onFocus={handleFocus} onBlur={handleBlur} />
        </div>
        {badge && (
          <div className={s.badge}>
            <Badge {...badge} state={props.disabled ? 'disabled' : undefined} />
          </div>
        )}
        {tailicon && (
          <div className={iconClassName}>
            <Icon icon={tailicon} />
          </div>
        )}
      </div>
    </FieldWrapper>
  );
};
