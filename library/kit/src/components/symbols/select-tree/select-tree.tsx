import React from 'react';

import { Tree } from './tree';
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
  accessor: K;
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

const optionsToArray = <T extends Record<string, any>, K extends keyof T>(options: T[]): T[] => {
  let result: T[] = [];

  options.forEach((option) => {
    result.push(option);

    if (option.children && option.children.length > 0) {
      result = [...result, ...optionsToArray(option.children)] as T[];
    }
  });

  return result;
};

const findOption = <T extends Record<string, any>, K extends keyof T>(
  options: T[],
  optionKey: K,
  value: T[K],
): number | undefined => {
  return options.findIndex((option) => option[optionKey] === value);
};

export const SelectTree = <T extends Record<string, any>, K extends keyof T>({
  value,
  placeholder,
  tabIndex,
  options,
  accessor,
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
  const [mappedOptions, setMappedOptions] = React.useState<T[]>(() => optionsToArray(options));
  const [initialize, setInitialize] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [isFocused, setIsFocused] = React.useState(false);
  const [selectedIndex, setSelectedIndex] = React.useState<number | null>(
    value ? (findOption(mappedOptions, optionKey, value) ?? null) : null,
  );
  const [optionSelected, setOption] = React.useState<T | undefined>(
    selectedIndex !== undefined && selectedIndex !== null ? mappedOptions[selectedIndex] : undefined,
  );

  React.useEffect(() => {
    setMappedOptions(optionsToArray(options));
  }, [options]);

  React.useEffect(() => {
    if (initialize) {
      setSelectedIndex(value ? (findOption(mappedOptions, optionKey, value) ?? null) : null);
    }
  }, [value]);

  React.useEffect(() => {
    if (initialize) {
      setOption(selectedIndex !== undefined && selectedIndex !== null ? mappedOptions[selectedIndex] : undefined);
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
            isFocused={isFocused || open}
            isOpen={open}
            isClearable={selectedIndex !== null && isClearable}
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
          const elements = Tree({ index: 0, accessor, options, optionKey, optionValue, templateOption });

          return React.Children.map(elements, (child, index) => {
            if (React.isValidElement(child)) {
              return React.cloneElement(child, {
                index,
                key: index,
                onClick: () => {
                  selectOptions.setOpen(false);
                },
                onChange: () => {
                  selectOptions.setOpen(false);
                },
              } as any);
            }
            return null;
          });
        }}
      />
    </SelectHelper>
  );
};
