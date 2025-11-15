import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { Option } from './option.tsx';
import { Badge, Icon } from '../../symbols';

const meta = {
  title: 'misc/Option',
  component: Option,
  tags: ['autodocs'],
} satisfies Meta<typeof Option>;
export default meta;

type Story = StoryObj<typeof meta>;

export const TypeLabelLeft: Story = {
  args: {
    label: 'Label',
    active: true,
    toggle: true,
    badge: <Badge leadIcon={<Icon icon={Icon.airplayLine} />} label={'khj'} />,
  },
  render: (args) => <Option {...args} />,
};
