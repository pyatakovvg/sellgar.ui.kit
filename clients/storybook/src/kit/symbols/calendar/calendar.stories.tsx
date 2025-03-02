import type { Meta, StoryObj } from '@storybook/react';

import { Calendar } from '@sellgar/kit';

const meta: Meta<typeof Calendar> = {
  title: 'Kit/Symbols/Calendar',
  component: Calendar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {},
  argTypes: {},
};

type Story = StoryObj<typeof meta>;
export default meta;

export const Default: Story = {
  args: {},
};
