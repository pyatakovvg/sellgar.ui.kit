import React from 'react';
import { useNumberFormat, NumberFormatOptions, format, unformat } from '@react-input/number-format';

import { Input } from '../input';
import type { IProps as IInputProps } from '../input/input.tsx';

const defaultFormatOptions: NumberFormatOptions = {
  maximumFractionDigits: 2,
};

export interface IProps extends IInputProps {}

export const InputNumeralComponent: React.FC<IProps> = ({ ref, ...props }) => {
  const inputRef = useNumberFormat({ ...defaultFormatOptions, locales: 'ru-RU' });

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
