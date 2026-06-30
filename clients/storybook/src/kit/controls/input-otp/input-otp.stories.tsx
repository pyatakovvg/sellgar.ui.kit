import type { Meta, StoryObj } from '@storybook/react-vite';

import { InputOtp } from '@sellgar/kit';

const meta: Meta<typeof InputOtp> = {
  title: 'Kit/Controls/InputOtp',
  component: InputOtp,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    disabled: {
      control: 'boolean',
    },
    target: {
      options: [undefined, 'destructive'],
    },
  },
  args: {
    value: '',
    onChange: () => undefined,
  },
};

type Story = StoryObj<typeof meta>;
export default meta;

export const Default: Story = {
  args: {},
};
