import type { Meta, StoryObj } from '@storybook/react';

import { ButtonIcon, iconName } from '@sellgar/kit/development';

const meta: Meta<typeof ButtonIcon> = {
  title: 'Kit/Symbols/ButtonIcon',
  component: ButtonIcon,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    style: 'primary',
    size: 'lg',
    icon: 'delete-row',
    disabled: false,
  },
  argTypes: {
    shape: {
      options: ['rounded', 'pill'],
      control: 'select',
    },
    target: {
      options: [undefined, 'destructive'],
      control: 'select',
    },
    icon: {
      options: [undefined, ...iconName],
      control: 'select',
    },
    style: {
      options: ['primary', 'secondary', 'tertiary', 'ghost'],
      control: 'select',
    },
    size: {
      options: ['lg', 'md', 'sm', 'xs'],
      control: 'select',
    },
  },
};

type Story = StoryObj<typeof meta>;
export default meta;

export const Default: Story = {
  args: {},
};
