import React from 'react';

import { Badge, InputAmount2 } from '@sellgar/kit';
import { MoneyDollarCircleLineIcon } from '@sellgar/kit/icons';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof InputAmount2> = {
  title: 'Kit/Controls/InputAmount2',
  component: InputAmount2,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    leadIcon: <MoneyDollarCircleLineIcon />,
    size: 'md',
    badge: <Badge label={'RUB'} />,
    placeholder: 'Введите сумму...',
    inputMode: 'decimal',
  },
  argTypes: {
    size: {
      options: ['xs', 'md'],
      control: 'radio',
    },
    disabled: {
      control: 'boolean',
    },
    target: {
      options: [undefined, 'destructive'],
      control: 'radio',
    },
    leadIcon: {
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
    const [value, setValue] = React.useState<string | undefined>('1234.56');

    return (
      <div style={{ width: 320 }}>
        <InputAmount2
          {...args}
          value={value}
          onChange={(nextValue) => {
            setValue(nextValue);
          }}
        />
        <div style={{ marginTop: 8, display: 'flex', gap: 8 }}>
          <button
            type="button"
            onClick={() => {
              setValue('987654321.99');
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
        <div style={{ marginTop: 8, fontSize: 12 }}>
          value: {value === undefined ? 'undefined' : value}
        </div>
      </div>
    );
  },
};
