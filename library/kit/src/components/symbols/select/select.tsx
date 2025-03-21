import React from 'react';

import { Empty } from './empty';
import { Option } from './option';
import { Placeholder } from './placeholder';
import { SelectInput } from '../../helpers/select-input';
import { Select as SelectHelper } from '../../helpers/select';

export interface IProps<T extends Record<string, any>, K extends keyof T> {
  leadIcon?: React.ReactNode;
  tailIcon?: React.ReactNode;
  badge?: string | number;
  size?: 'xs' | 'md';
  target?: 'destructive';
  optionKey: K;
  optionValue: K;
  options: T[];
  value?: T[K];
  tabIndex?: number;
  placeholder?: string;
  disabled?: boolean;
  isClearable?: boolean;
  templateValue?(option?: T): React.ReactNode;
  templateOption?(option: T): React.ReactNode;
  onChange?: (value: T[K] | undefined) => void;
  onFocus?: () => void;
  onBlur?: () => void;
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
  placeholder,
  tabIndex,
  options,
  optionKey,
  optionValue,
  templateValue,
  templateOption,
  onBlur,
  onFocus,
  onChange,
  disabled,
  isClearable,
  ...props
}: IProps<T, K>) => {
  const [initialize, setInitialize] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [isFocused, setIsFocused] = React.useState(false);
  const [selectedIndex, setSelectedIndex] = React.useState<number | null>(
    value ? (findOption(options, optionKey, value) ?? null) : null,
  );
  const [optionSelected, setOption] = React.useState<T | undefined>(
    selectedIndex !== undefined && selectedIndex !== null ? options[selectedIndex] : undefined,
  );

  React.useEffect(() => {
    if (initialize) {
      setSelectedIndex(value ? (findOption(options, optionKey, value) ?? null) : null);
    }
  }, [value]);

  React.useEffect(() => {
    if (initialize) {
      setOption(selectedIndex !== undefined && selectedIndex !== null ? options[selectedIndex] : undefined);
    }
  }, [selectedIndex]);

  React.useEffect(() => {
    if (disabled) {
      return void 0;
    }

    if (initialize) {
      if (open) {
        onFocus && onFocus();
      } else {
        onBlur && onBlur();
      }
    }
  }, [open]);

  React.useEffect(() => {
    if (disabled) {
      return void 0;
    }

    if (initialize) {
      onChange && onChange(optionSelected ? optionSelected[optionKey] : undefined);
    }
  }, [optionSelected]);

  React.useEffect(() => {
    if (disabled && open) {
      setOpen(false);
    }
  }, [disabled]);

  React.useEffect(() => {
    setInitialize(true);
  }, []);

  return (
    <SelectHelper
      tabIndex={tabIndex}
      open={open}
      disabled={disabled}
      initialSelectedIndex={selectedIndex}
      selectedIndex={selectedIndex}
      setOpen={setOpen}
      onSelect={setSelectedIndex}
      onBlur={() => setIsFocused(false)}
      onFocus={() => setIsFocused(true)}
    >
      <SelectHelper.Reference
        reference={(select) => (
          <SelectInput
            {...props}
            disabled={disabled}
            isFocused={isFocused}
            isOpen={open}
            isClearable={!!selectedIndex && isClearable}
            onClear={() => {
              if (disabled) {
                return void 0;
              }
              setSelectedIndex(null);
              select.setSelectedIndex(null);
            }}
          >
            {optionSelected ? (
              templateValue ? (
                templateValue(optionSelected)
              ) : (
                <Option title={optionSelected[optionValue]} disabled={disabled} />
              )
            ) : (
              <Placeholder title={placeholder ?? 'Select...'} />
            )}
          </SelectInput>
        )}
      />
      <SelectHelper.Options
        empty={<Empty title={'Нет данных'} />}
        options={(selectOptions) => {
          return options.map((option, optionIndex) => {
            return (
              <SelectHelper.Option
                key={option[optionKey]}
                index={optionIndex}
                onClick={() => {
                  selectOptions.setOpen(false);
                }}
                onChange={() => {
                  selectOptions.setOpen(false);
                }}
                option={() => {
                  return templateOption ? templateOption(option) : <Option title={option[optionValue]} />;
                }}
              />
            );
          });
        }}
      />
    </SelectHelper>
  );
};
