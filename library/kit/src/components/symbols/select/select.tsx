import React from 'react';

import { Input } from './input';
import { Option } from './option';
import { Select as SelectHelper } from '../../helpers/select';

export interface IProps<T extends Record<string, any>, K extends keyof T>
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'className' | 'children'> {
  leadicon?: React.ReactNode;
  tailicon?: React.ReactNode;
  badge?: string | number;
  size?: 'xs' | 'md';
  target?: 'destructive';
  optionKey: K;
  optionValue: K;
  options: T[];
  value?: T[K];
  templateValue?(option?: T): React.ReactNode;
  templateOption?(option: T): React.ReactNode;
}

const findOption = <T extends Record<string, any>, K extends keyof T>(
  options: T[],
  optionKey: K,
  value: T[K],
): number | undefined => {
  return options.findIndex((option) => option[optionKey] === value);
};

export const Select = <T extends Record<string, any>, K extends keyof T>({
  value,
  options,
  optionKey,
  optionValue,
  templateValue,
  templateOption,
  ...props
}: IProps<T, K>) => {
  const [open, setOpen] = React.useState(false);
  const [selectedIndex] = React.useState(() => (value ? findOption(options, optionKey, value) : -1));
  const [optionSelected, setOption] = React.useState<T | undefined>(() =>
    selectedIndex && selectedIndex > -1 ? options[selectedIndex] : undefined,
  );

  const filteredOptions = React.useMemo(() => options, [options]);

  return (
    <SelectHelper open={open} setOpen={setOpen} initialSelectedIndex={selectedIndex}>
      <SelectHelper.Reference
        reference={() => (
          <Input {...props} isFocused={open}>
            {optionSelected ? (
              templateValue ? (
                templateValue(optionSelected)
              ) : (
                <Option title={optionSelected[optionValue]} />
              )
            ) : (
              <Option title={'Select...'} />
            )}
          </Input>
        )}
      />
      <SelectHelper.Options
        empty={<Option title={'Нет данных'} />}
        options={(selectOptions) => {
          return filteredOptions.map((option, index) => {
            return (
              <SelectHelper.Option
                key={option[optionKey]}
                index={index}
                onClick={() => {
                  selectOptions.setOpen(false);
                  setOption(options[index]);
                }}
                onChange={() => {
                  selectOptions.setOpen(false);
                  setOption(options[index]);
                }}
                option={() => {
                  return <Option title={option.name} />;
                }}
              />
            );
          });
        }}
      />
    </SelectHelper>
  );
};
