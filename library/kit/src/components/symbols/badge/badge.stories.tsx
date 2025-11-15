import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { Badge } from './badge.tsx';
import { Icon } from '../icon';

const meta = {
  title: 'symbols/Badge',
  component: Badge,
  tags: ['autodocs'],
  args: {
    color: 'gray',
    size: 'md',
    shape: 'rounded',
    label: 'Badge',
  },
  argTypes: {
    color: {
      control: { type: 'select' },
      options: ['gray', 'red', 'green', 'blue', 'yellow', 'orange', 'purple', 'pink', 'white'],
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
} satisfies Meta<typeof Badge>;
export default meta;

type Story = StoryObj<typeof meta>;

export const TypeLabelLeft: Story = {
  render: (args) => <Badge {...args} leadIcon={<Icon icon={Icon.checkboxCircleFill} />} tailIcon={<Icon icon={Icon.hashtag} />} />,
};
