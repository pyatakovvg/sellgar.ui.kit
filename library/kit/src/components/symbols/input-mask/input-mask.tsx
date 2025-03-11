import React from 'react';
import { useMask, Replacement } from '@react-input/mask';

import { Input } from '../input';
import type { IProps as IInputProps } from '../input/input.tsx';

import cn from 'classnames';
import s from './default.module.scss';

export interface IProps extends IInputProps {
  mask: string;
  replacement?: Replacement;
}

export const InputMask: React.FC<IProps> = ({ ref, mask, replacement, ...props }) => {
  const inputRef = useMask({
    mask,
    replacement,
    showMask: true,
  });

  React.useImperativeHandle(ref, () => inputRef.current);

  return <Input ref={inputRef} {...props} />;
};
