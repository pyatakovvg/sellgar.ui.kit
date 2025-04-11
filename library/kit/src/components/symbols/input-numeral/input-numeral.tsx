import React from 'react';
import { useNumberFormat, format, unformat } from '@react-input/number-format';

import { Input } from '../input';
import type { IProps as IInputProps } from '../input/input.tsx';

export interface IProps extends IInputProps {}

const InputNumeralComponent: React.FC<IProps> = ({ ref, ...props }) => {
  const inputRef = useNumberFormat({});

  React.useImperativeHandle(ref, () => inputRef.current);

  return <Input ref={inputRef} {...props} />;
};

type TInputNumeral = typeof InputNumeralComponent & {
  format: typeof format;
  unFormat: typeof unformat;
};

export const InputNumeral: TInputNumeral = Object.assign(InputNumeralComponent, {
  format: format,
  unFormat: unformat,
});
