import React from 'react';
import type { Meta, StoryObj, Args } from '@storybook/react-vite';

import { ButtonLink } from './button-link.tsx';
import { Icon } from '../icon';
import { Badge } from '../badge';

const meta = {
  title: 'symbols/ButtonLink',
  component: ButtonLink,
  tags: ['autodocs'],
  args: {
    target: 'default',
    size: 'md',
    children: 'Нажми меня!',
    disabled: false,
  },
  argTypes: {
    target: {
      control: { type: 'select' },
      options: ['default', 'destructive', 'info', 'success'],
    },
    size: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'md'],
    },
  },
} satisfies Meta<typeof ButtonLink>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args: Args) => (
    <ButtonLink {...args} leadIcon={<Icon icon={Icon.scanLine} />} tailIcon={<Icon icon={Icon.arrowRightLine} />} badge={<Badge label={'16'} />} />
  ),
};
