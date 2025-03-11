import React from 'react';
import moment from 'moment';

import { Icon } from '../icon';
import { Calendar } from '../calendar';
import { Dropdown } from '../../helpers/dropdown';
import { SelectInput } from '../../helpers/select-input';

import { Option } from './option';
import { Placeholder } from './placeholder';

import s from './default.module.scss';

export interface IProps {
  tailIcon?: React.ReactNode;
  badge?: string | number;
  size?: 'xs' | 'md';
  target?: 'destructive';
  value?: string;
  defaultValue?: string;
  tabIndex?: number;
  placeholder?: string;
  disabled?: boolean;
  isClearable?: boolean;
  format?: string;
  displayFormat?: string;
  templateValue?(value: string): React.ReactNode;
  templateOption?(value: string): React.ReactNode;
  onChange?: (value?: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
}

export const Datepicker: React.FC<IProps> = ({
  value,
  defaultValue,
  placeholder,
  tabIndex,
  templateValue,
  templateOption,
  onBlur,
  onFocus,
  onChange,
  disabled,
  isClearable,
  format = 'YYYY-MM-DDTHH:mm:ss.sssZ',
  displayFormat = 'DD.MM.YYYY',
  ...props
}) => {
  const [initialize, setInitialize] = React.useState(false);

  const [open, setOpen] = React.useState(false);
  const [dateValue, setValue] = React.useState<string | undefined>(() => value || defaultValue);

  React.useMemo(() => {
    if (initialize) {
      setValue(value);
    }
  }, [value]);

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
      onChange && onChange(dateValue);
    }
  }, [dateValue]);

  React.useEffect(() => {
    if (disabled && open) {
      setOpen(false);
    }
  }, [disabled]);

  React.useEffect(() => {
    setInitialize(true);
  }, []);

  const handleChange = (value: string | undefined) => {
    if (disabled) {
      return void 0;
    }

    setValue(value);
    setOpen(false);
  };

  return (
    <Dropdown open={open} setOpen={setOpen} disabled={disabled}>
      <Dropdown.Reference
        reference={() => (
          <SelectInput
            {...props}
            leadIcon={<Icon icon={'calendar-line'} />}
            disabled={disabled}
            isFocused={open}
            isClearable={!!dateValue && isClearable}
            onClear={() => {
              if (disabled) {
                return void 0;
              }
              onChange && onChange(undefined);
            }}
          >
            {dateValue ? (
              <Option disabled={disabled} title={moment(dateValue).format(displayFormat)} />
            ) : (
              <Placeholder title={placeholder ?? 'Select...'} />
            )}
          </SelectInput>
        )}
      />
      <Dropdown.Target>
        <div className={s.calendar}>
          <Calendar value={dateValue} format={format} onChange={handleChange} />
        </div>
      </Dropdown.Target>
    </Dropdown>
  );
};
