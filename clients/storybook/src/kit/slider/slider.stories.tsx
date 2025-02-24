import type { Meta, StoryObj } from '@storybook/react';

import { Slider } from '@library/kit';

const meta: Meta<typeof Slider> = {
  title: 'Kit/Symbols/Slider',
  component: Slider,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    value: 50,
  },
  argTypes: {},
};

type Story = StoryObj<typeof meta>;
export default meta;

export const Default: Story = {
  args: {},
};
