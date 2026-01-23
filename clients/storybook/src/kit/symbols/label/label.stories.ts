import type { Meta, StoryObj } from '@storybook/react-vite';

import { Label } from '@sellgar/kit';

const meta: Meta<typeof Label> = {
  title: 'Kit/Symbols/Label',
  component: Label,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    label: 'Label',
    caption: '(optional)',
    required: false,
  },
  argTypes: {
    required: {
      control: 'boolean',
    },
  },
};

type Story = StoryObj<typeof meta>;
export default meta;

export const Default: Story = {
  args: {},
};
