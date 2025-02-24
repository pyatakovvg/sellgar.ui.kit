import type { Meta, StoryObj } from '@storybook/react';

import { Input } from '@library/kit';

const meta: Meta<typeof Input> = {
  title: 'Kit/Symbols/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    leadicon: 'earth-line',
    tailicon: 'information-line',
    badge: '⌘K',
  },
  argTypes: {
    size: {
      options: ['xs', 'md'],
      control: 'select',
    },
    disabled: {
      control: 'boolean',
    },
    target: {
      options: [undefined, 'destructive'],
      control: 'select',
    },
  },
};

type Story = StoryObj<typeof meta>;
export default meta;

export const Default: Story = {
  args: {},
};
