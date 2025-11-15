import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { Divider } from './divider.tsx';

const meta = {
  title: 'misc/Divider',
  component: Divider,
  tags: ['autodocs'],
} satisfies Meta<typeof Divider>;
export default meta;

type Story = StoryObj<typeof meta>;

export const TypeLabelLeft: Story = {
  args: {
    type: 'label-left',
    label: 'Label',
  },
  render: (args) => <Divider {...args} />,
};

export const TypeLabelCenter: Story = {
  args: {
    type: 'label-center',
    label: 'Label',
  },
  render: (args) => <Divider {...args} />,
};

export const TypeLabelCenterActionCenter: Story = {
  args: {
    type: 'action-center',
    actionLabel: 'Add',
  },
  render: (args) => <Divider {...args} />,
};
