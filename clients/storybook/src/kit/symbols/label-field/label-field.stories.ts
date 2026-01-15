import type { Meta, StoryObj } from '@storybook/react-vite';

import { LabelField } from '@sellgar/kit';

const meta: Meta<typeof LabelField> = {
  title: 'Kit/Symbols/LabelField',
  component: LabelField,
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
