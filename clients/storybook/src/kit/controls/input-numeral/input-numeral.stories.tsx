import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';

import { InputNumeral, Badge, ToolTip } from '@sellgar/kit';
import { EarthLineIcon, InformationLineIcon } from '@sellgar/kit/icons';

const meta: Meta<typeof InputNumeral> = {
  title: 'Kit/Controls/InputNumeral',
  component: InputNumeral,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    leadIcon: <EarthLineIcon />,
    tailIcon: (
      <ToolTip>
        <ToolTip.Trigger>
          <InformationLineIcon />
        </ToolTip.Trigger>
        <ToolTip.Content>
          <ToolTip.Content.Label>Numeric value</ToolTip.Content.Label>
          <ToolTip.Content.Caption>onChange returns formattedValue and unformatValue as number</ToolTip.Content.Caption>
        </ToolTip.Content>
      </ToolTip>
    ),
    size: 'md',
    allowDecimal: true,
    allowNegative: true,
    badge: <Badge label={'123'} />,
    placeholder: 'Введите число...',
  },
  argTypes: {
    size: {
      options: ['xs', 'md'],
      control: {
        type: 'radio',
      },
    },
    disabled: {
      control: 'boolean',
    },
    target: {
      options: [undefined, 'destructive'],
      control: 'radio',
    },
    allowDecimal: {
      control: 'boolean',
    },
    allowNegative: {
      control: 'boolean',
    },
    leadIcon: {
      control: false,
    },
    tailIcon: {
      control: false,
    },
    badge: {
      control: false,
    },
  },
};

type Story = StoryObj<typeof meta>;
export default meta;

export const Default: Story = {
  render: (args) => {
    const [value, setValue] = React.useState<number | undefined>(1234.56);
    const [formattedValue, setFormattedValue] = React.useState('');
    const [unformatValue, setUnformatValue] = React.useState<number | undefined>(undefined);

    return (
      <div style={{ width: 320 }}>
        <InputNumeral
          {...args}
          value={value}
          onChange={(nextFormattedValue, nextUnformatValue) => {
            setFormattedValue(nextFormattedValue);
            setValue(nextUnformatValue);
            setUnformatValue(nextUnformatValue);
          }}
        />
        <div style={{ marginTop: 8, display: 'flex', gap: 8 }}>
          <button
            type="button"
            onClick={() => {
              setValue(987654321.99);
            }}
          >
            Set external value
          </button>
          <button
            type="button"
            onClick={() => {
              setValue(undefined);
            }}
          >
            Reset external value
          </button>
        </div>
        <div style={{ marginTop: 8, fontSize: 12 }}>formattedValue: {formattedValue || '(empty)'}</div>
        <div style={{ marginTop: 4, fontSize: 12 }}>
          unformatValue: {unformatValue === undefined ? 'undefined' : unformatValue}
        </div>
      </div>
    );
  },
};
