import type { Meta, StoryObj } from '@storybook/react';

import { Checkbox } from '@sellgar/kit';

const meta: Meta<typeof Checkbox> = {
  title: 'Kit/Symbols/Checkbox',
  component: Checkbox,
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
