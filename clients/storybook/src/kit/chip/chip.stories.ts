import type { Meta, StoryObj } from '@storybook/react';

import { Chip, iconName } from '@library/kit';

const meta: Meta<typeof Chip> = {
  title: 'Kit/Symbols/Chip',
  component: Chip,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    type: 'icon',
    disabled: false,
    isActive: false,
    label: 'Label',
    size: 'lg',
    leadicon: 'checkbox-circle-fill',
  },
  argTypes: {
    type: {
      options: ['icon', 'slot'],
      control: 'select',
    },
    shape: {
      options: ['rounded', 'pill'],
      control: 'select',
    },
    leadicon: {
      options: [undefined, ...iconName],
      control: 'select',
    },
    size: {
      options: ['lg', 'md', 'sm'],
      control: 'select',
    },
    label: {
      control: 'text',
    },
  },
};

type Story = StoryObj<typeof meta>;
export default meta;

export const Default: Story = {
  args: {},
};
