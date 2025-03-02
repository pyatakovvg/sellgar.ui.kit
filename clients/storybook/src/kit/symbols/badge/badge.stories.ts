import type { Meta, StoryObj } from '@storybook/react';

import { Badge, iconName } from '@sellgar/kit';

const meta: Meta<typeof Badge> = {
  title: 'Kit/Symbols/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    stroke: false,
    disabled: false,
    color: 'gray',
    label: 'Badge',
    size: 'lg',
    leadicon: 'checkbox-circle-fill',
    tailicon: 'hashtag',
  },
  argTypes: {
    color: {
      options: [
        'gray',
        'blue',
        'green',
        'red',
        'orange',
        'purple',
        'white',
        'surface',
        'white-destructive',
        'surface-destructive',
      ],
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
    tailicon: {
      options: iconName,
      control: 'select',
    },
    size: {
      options: ['lg', 'md', 'sm', 'xs'],
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
