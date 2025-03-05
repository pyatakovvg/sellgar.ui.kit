import type { Meta, StoryObj } from '@storybook/react';

import { User } from '@sellgar/kit';

const meta: Meta = {
  title: 'Kit/SubComponents/User',
  component: User,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    name: 'Пятаков В.Г.',
    badge: 'Админ',
    email: 'zemlya911@gmail.com',
  },
  argTypes: {},
};

type Story = StoryObj<typeof meta>;
export default meta;

export const Default: Story = {
  args: {},
};
