import type { Meta, StoryObj } from '@storybook/react';

import { Radio } from '@sellgar/kit/development';

const meta: Meta<typeof Radio> = {
  title: 'Kit/Symbols/Radio',
  component: Radio,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    checked: false,
    disabled: false,
    label: 'Checkbox',
    caption: 'caption',
  },
  argTypes: {
    size: {
      options: ['sm', 'md'],
      control: 'select',
    },
    checked: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
  },
};

type Story = StoryObj<typeof meta>;
export default meta;

export const Default: Story = {
  args: {},
};
