import type { Meta, StoryObj } from '@storybook/react-vite';

import { Slider } from '@sellgar/kit';

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

// @ts-ignore
type Story = StoryObj<typeof meta>;
export default meta;

export const Default: Story = {
  args: {},
};
