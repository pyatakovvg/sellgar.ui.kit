import React from 'react';
import type { Meta, StoryObj, Args } from '@storybook/react-vite';

import { Button } from './button.tsx';
import { Icon } from '../icon';
import { Badge } from '../badge';

const meta = {
  title: 'symbols/Button',
  component: Button,
  tags: ['autodocs'],
  args: {
    style: 'primary',
    target: 'default',
    size: 'md',
    shape: 'rounded',
    children: 'Нажми меня!',
  },
  argTypes: {
    form: {
      control: { type: 'select' },
      options: ['icon', 'link'],
    },
    style: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'tertiary', 'ghost'],
    },
    target: {
      control: { type: 'select' },
      options: ['default', 'destructive', 'info', 'success'],
    },
    size: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'md', 'lg'],
    },
    shape: {
      control: { type: 'select' },
      options: ['rounded', 'pill'],
    },
  },
} satisfies Meta<typeof Button>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args: Args) => (
    <Button {...args} leadIcon={<Icon icon={Icon.scanLine} />} tailIcon={<Icon icon={Icon.arrowRightLine} />} badge={<Badge label={'16'} />} />
  ),
};
