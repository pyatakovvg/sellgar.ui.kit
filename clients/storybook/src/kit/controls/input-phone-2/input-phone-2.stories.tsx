import React from 'react';

import { Badge, InputPhone2 } from '@sellgar/kit';
import { PhoneLineIcon } from '@sellgar/kit/icons';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof InputPhone2> = {
  title: 'Kit/Controls/InputPhone2',
  component: InputPhone2,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  args: {
    size: 'md',
    leadIcon: <PhoneLineIcon />,
    badge: <Badge label={'RU'} />,
  },
  argTypes: {
    size: {
      options: ['xs', 'md'],
      control: 'radio',
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
    const [value, setValue] = React.useState('');

    return (
      <div style={{ width: 320 }}>
        <InputPhone2
          {...args}
          value={value}
          onChange={(nextValue) => {
            setValue(nextValue);
          }}
        />
        <div style={{ marginTop: 8, fontSize: 12 }}>value: {value || '(empty)'}</div>
      </div>
    );
  },
};
