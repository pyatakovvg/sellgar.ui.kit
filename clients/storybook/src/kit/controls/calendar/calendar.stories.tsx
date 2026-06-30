import type { Meta, StoryObj } from '@storybook/react-vite';

import React from 'react';
import { Calendar, DropDownWrapper } from '@sellgar/kit';

type TCalendarProps = React.ComponentProps<typeof Calendar>;

interface IControlledCalendarProps extends Omit<TCalendarProps, 'onChange' | 'value'> {
  caption?: string;
  showAction?: boolean;
  showValue?: boolean;
  value?: string;
  onChange?: TCalendarProps['onChange'];
}

const DEFAULT_VALUE = '2024-02-02T23:55:00.000';
const TIMEZONE_VALUE = '2024-02-02T23:55:00.000+05:00';
const DEFAULT_FORMAT = 'YYYY-MM-DDTHH:mm:ss.SSSZ';

const modeVariants = [
  { title: 'date and time', props: { timeSelection: true } },
  { title: 'date only', props: { timeSelection: false } },
  { title: 'timezone', props: { value: TIMEZONE_VALUE, displayTimeZone: 'Asia/Almaty', timeSelection: true } },
] as const;

const previewStyle: React.CSSProperties = {
  display: 'grid',
  gap: 8,
  width: 420,
};

const groupStyle: React.CSSProperties = {
  display: 'grid',
  gap: 24,
  width: 420,
};

const surfaceStyle: React.CSSProperties = {
  padding: '10px 12px',
};

const captionStyle: React.CSSProperties = {
  margin: 0,
  color: 'var(--text-base-secondary)',
  fontSize: 12,
};

const valueStyle: React.CSSProperties = {
  margin: 0,
  minHeight: 20,
  color: 'var(--text-base-secondary)',
  fontSize: 12,
};

const renderValue = (value?: string) => {
  return value ?? 'undefined';
};

const CalendarSurface: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <DropDownWrapper>
      <div style={surfaceStyle}>{children}</div>
    </DropDownWrapper>
  );
};

const ControlledCalendar: React.FC<IControlledCalendarProps> = ({
  value: initialValue,
  caption,
  showAction = false,
  showValue = true,
  onChange,
  onCancel,
  ...props
}) => {
  const [value, setValue] = React.useState<string | undefined>(initialValue);
  const [action, setAction] = React.useState<'idle' | 'change' | 'cancel'>('idle');

  React.useEffect(() => {
    setValue(initialValue);
    setAction('idle');
  }, [initialValue]);

  const handleChange = (value?: string) => {
    setValue(value);
    setAction('change');
    onChange?.(value);
  };

  const handleCancel = () => {
    setAction('cancel');
    onCancel?.();
  };

  return (
    <div style={previewStyle}>
      {caption ? <p style={captionStyle}>{caption}</p> : null}
      {showValue ? <p style={valueStyle}>{renderValue(value)}</p> : null}
      {showAction ? <p style={valueStyle}>{action}</p> : null}
      <CalendarSurface>
        <Calendar {...props} value={value} onChange={handleChange} onCancel={handleCancel} />
      </CalendarSurface>
    </div>
  );
};

const meta: Meta<typeof Calendar> = {
  title: 'Kit/Controls/Calendar',
  component: Calendar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    value: DEFAULT_VALUE,
    format: DEFAULT_FORMAT,
    timeSelection: true,
  },
  argTypes: {
    value: {
      control: 'text',
    },
    defaultValue: {
      control: 'text',
    },
    format: {
      control: 'text',
    },
    displayTimeZone: {
      control: 'text',
    },
    timeSelection: {
      control: 'boolean',
    },
    onChange: {
      control: false,
    },
    onCancel: {
      control: false,
    },
  },
};

type Story = StoryObj<typeof meta>;

export default meta;

export const Default: Story = {
  render(args) {
    return <ControlledCalendar {...args} />;
  },
};

export const DateOnly: Story = {
  args: {
    timeSelection: false,
  },
  render(args) {
    return <ControlledCalendar {...args} />;
  },
};

export const WithTimezone: Story = {
  args: {
    value: TIMEZONE_VALUE,
    displayTimeZone: 'Asia/Almaty',
  },
  render(args) {
    return <ControlledCalendar {...args} />;
  },
};

export const WithActions: Story = {
  render(args) {
    return <ControlledCalendar {...args} showAction />;
  },
};

export const Modes: Story = {
  render(args) {
    return (
      <div style={groupStyle}>
        {modeVariants.map((mode) => (
          <ControlledCalendar key={mode.title} {...args} {...mode.props} caption={mode.title} showValue={false} />
        ))}
      </div>
    );
  },
};
