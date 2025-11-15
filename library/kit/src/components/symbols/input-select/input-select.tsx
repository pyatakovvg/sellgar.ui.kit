import React from 'react';

import { Icon } from '../icon';
import { Input } from '../input';
import { Option } from '../../misc';
import { Select } from '../../helpers/select';

export interface IProps<T extends Record<string, any>, K extends keyof T>
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'className' | 'children'> {
  leadIcon?: React.ReactNode;
  tailIcon?: React.ReactNode;
  badge?: string | number;
  size?: 'xs' | 'md';
  target?: 'destructive';
  optionKey: K;
  optionValue: K;
  options: T[];
}

export const InputSelect = <T extends Record<string, any>, K extends keyof T>({ options, optionKey, optionValue, ...props }: IProps<T, K>) => {
  const [open, setOpen] = React.useState(false);
  const [inputValue, setInputValue] = React.useState('');

  const filteredOptions = inputValue ? options.filter((option) => option[optionValue].toLowerCase().startsWith(inputValue.toLowerCase())) : [];

  return (
    <Select open={open} setOpen={setOpen}>
      <Select.Reference
        reference={(dropdown) => (
          <Input
            {...props}
            value={inputValue}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              const value = event.target.value;
              setInputValue(value);

              if (value) {
                dropdown.setActiveIndex(0);
                setOpen(true);
              } else {
                setOpen(false);
              }
            }}
            onKeyDown={(event) => {
              if (event.key === 'Enter' && dropdown.activeIndex != null && options[dropdown.activeIndex]) {
                setInputValue(options[dropdown.activeIndex][optionValue]);
                dropdown.setActiveIndex(null);
                setOpen(false);
              }
            }}
          />
        )}
      />
      <Select.Options
        empty={<Option leadIcon={<Icon icon={'filter-off-line'} />} label={'Нет данных'} />}
        options={(dropdownOptions) => {
          return filteredOptions.map((option, index) => {
            return (
              <Select.Option
                key={option[optionKey]}
                index={index}
                onClick={() => {
                  setInputValue(options[index][optionValue]);
                  dropdownOptions.setOpen(false);
                }}
                option={(dropdown) => {
                  return <Option active={dropdown.activeIndex === index} leadIcon={<Icon icon={'windy-fill'} />} label={option.name} badge={option.role} />;
                }}
              />
            );
          });
        }}
      />
    </Select>
  );
};
