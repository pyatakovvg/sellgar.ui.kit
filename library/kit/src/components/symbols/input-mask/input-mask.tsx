import React from 'react';
import { useMask, Replacement } from '@react-input/mask';

import { Input } from '../input';
import type { IProps as IInputProps } from '../input/input.tsx';

export interface IProps extends IInputProps {
  mask: string;
  replacement?: Replacement;
  showMask?: boolean;
}

export const InputMask: React.FC<IProps> = ({ ref, mask, replacement, showMask, ...props }) => {
  const inputRef = useMask({
    mask,
    replacement,
    showMask,
  });

  React.useImperativeHandle(ref, () => inputRef.current);

  return <Input ref={inputRef} {...props} />;
};
