import type { Meta, StoryObj } from '@storybook/react-vite';

import React from 'react';
import { Badge, Datepicker, ToolTip } from '@sellgar/kit';
import { CalendarCheckLineIcon, InformationLineIcon } from '@sellgar/kit/icons';

type TDatepickerProps = React.ComponentProps<typeof Datepicker>;

interface IControlledDatepickerProps extends TDatepickerProps {
  caption?: string;
  showValue?: boolean;
}

const DEFAULT_VALUE = '1985-10-13T00:00:00.000';
const TIMEZONE_VALUE = '1985-10-13T00:00:00.000+05:00';
const DEFAULT_FORMAT = 'YYYY-MM-DDTHH:mm:ss.SSSZ';
const DEFAULT_DISPLAY_FORMAT = 'DD.MM.YYYY HH:mm';

const sizeVariants = ['md', 'xs'] as const;
const stateVariants = [
  { title: 'default', props: {} },
  { title: 'destructive', props: { target: 'destructive' } },
  { title: 'disabled', props: { disabled: true } },
] as const;
const modeVariants = [
  { title: 'date and time', props: { timeSelection: true, displayFormat: 'DD.MM.YYYY HH:mm' } },
  { title: 'date only', props: { timeSelection: false, displayFormat: 'DD.MM.YYYY' } },
  { title: 'empty', props: { value: undefined, timeSelection: true } },
] as const;

const previewStyle: React.CSSProperties = {
  display: 'grid',
  gap: 8,
  width: 360,
};

const sectionStyle: React.CSSProperties = {
  display: 'grid',
  gap: 12,
};

const groupStyle: React.CSSProperties = {
  display: 'grid',
  gap: 16,
  width: 360,
};

const matrixStyle: React.CSSProperties = {
  display: 'grid',
  gap: 24,
  width: 'min(100%, 520px)',
};

const matrixRowStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'minmax(96px, 128px) minmax(0, 1fr)',
  alignItems: 'center',
  gap: 16,
};

const valueStyle: React.CSSProperties = {
  margin: 0,
  minHeight: 20,
  color: 'var(--text-base-secondary)',
  fontSize: 12,
};

const captionStyle: React.CSSProperties = {
  margin: 0,
  color: 'var(--text-base-secondary)',
  fontSize: 12,
};

const titleStyle: React.CSSProperties = {
  fontSize: 14,
  fontWeight: 600,
};

const modeTitleStyle: React.CSSProperties = {
  color: 'var(--text-base-secondary)',
  fontSize: 12,
};

const renderValue = (value?: string) => {
  return value ?? 'undefined';
};

const ControlledDatepicker: React.FC<IControlledDatepickerProps> = ({
  value: initialValue,
  onChange,
  caption,
  showValue = true,
  ...props
}) => {
  const [value, setValue] = React.useState<string | undefined>(initialValue);

  React.useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  const handleChange = (value?: string) => {
    setValue(value);
    onChange?.(value);
  };

  return (
    <div style={previewStyle}>
      {caption ? <p style={captionStyle}>{caption}</p> : null}
      {showValue ? <p style={valueStyle}>{renderValue(value)}</p> : null}
      <Datepicker {...props} value={value} onChange={handleChange} />
    </div>
  );
};

const meta: Meta<typeof Datepicker> = {
  title: 'Kit/Controls/Datepicker',
  component: Datepicker,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    value: DEFAULT_VALUE,
    format: DEFAULT_FORMAT,
    displayFormat: DEFAULT_DISPLAY_FORMAT,
    placeholder: 'Выберите дату',
    disabled: false,
    isClearable: true,
    timeSelection: true,
  },
  argTypes: {
    size: {
      options: sizeVariants,
      control: 'radio',
    },
    disabled: {
      control: 'boolean',
    },
    isClearable: {
      control: 'boolean',
    },
    timeSelection: {
      control: 'boolean',
    },
    target: {
      options: [undefined, 'destructive'],
      control: 'radio',
    },
    value: {
      control: 'text',
    },
    format: {
      control: 'text',
    },
    displayFormat: {
      control: 'text',
    },
    displayTimeZone: {
      control: 'text',
    },
    tailIcon: {
      control: false,
    },
    badge: {
      control: false,
    },
    templateValue: {
      control: false,
    },
  },
};

type Story = StoryObj<typeof meta>;

export default meta;

export const Default: Story = {
  render(args) {
    return <ControlledDatepicker {...args} />;
  },
};

export const Sizes: Story = {
  render(args) {
    return (
      <div style={groupStyle}>
        {sizeVariants.map((size) => (
          <ControlledDatepicker key={size} {...args} size={size} caption={size} showValue={false} />
        ))}
      </div>
    );
  },
};

export const States: Story = {
  render(args) {
    return (
      <div style={groupStyle}>
        {stateVariants.map((state) => (
          <ControlledDatepicker key={state.title} {...args} {...state.props} caption={state.title} showValue={false} />
        ))}
      </div>
    );
  },
};

export const Modes: Story = {
  render(args) {
    return (
      <div style={groupStyle}>
        {modeVariants.map((mode) => (
          <ControlledDatepicker key={mode.title} {...args} {...mode.props} caption={mode.title} />
        ))}
      </div>
    );
  },
};

export const WithSlots: Story = {
  render(args) {
    return (
      <ControlledDatepicker
        {...args}
        badge={<Badge label={'⌘K'} />}
        tailIcon={
          <ToolTip>
            <ToolTip.Trigger>
              <InformationLineIcon />
            </ToolTip.Trigger>
            <ToolTip.Content>
              <ToolTip.Content.Label>Дата операции</ToolTip.Content.Label>
              <ToolTip.Content.Caption>Дата и время будут сохранены в выбранном формате.</ToolTip.Content.Caption>
            </ToolTip.Content>
          </ToolTip>
        }
      />
    );
  },
};

export const WithTemplateValue: Story = {
  render(args) {
    return (
      <ControlledDatepicker
        {...args}
        templateValue={(value) => (
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
            <CalendarCheckLineIcon />
            {value.slice(0, 10)}
          </span>
        )}
      />
    );
  },
};

export const WithTimezone: Story = {
  args: {
    value: TIMEZONE_VALUE,
    displayTimeZone: 'Asia/Almaty',
  },
  render(args) {
    return <ControlledDatepicker {...args} />;
  },
};

export const Matrix: Story = {
  render(args) {
    return (
      <div style={matrixStyle}>
        {stateVariants.map((state) => (
          <div key={state.title} style={sectionStyle}>
            <div style={titleStyle}>{state.title}</div>
            {modeVariants.map((mode) => (
              <div key={mode.title} style={matrixRowStyle}>
                <div style={modeTitleStyle}>{mode.title}</div>
                <ControlledDatepicker {...args} {...mode.props} {...state.props} showValue={false} />
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  },
};
