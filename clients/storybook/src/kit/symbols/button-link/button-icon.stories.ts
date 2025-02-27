import type { Meta, StoryObj } from '@storybook/react';

import { ButtonLink, iconName } from '@library/kit';

const meta: Meta<typeof ButtonLink> = {
  title: 'Kit/Symbols/ButtonLink',
  component: ButtonLink,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    size: 'md',
    leadicon: 'scan-line',
    tailicon: 'arrow-right-line',
    label: '16',
    children: 'Button link',
    disabled: false,
  },
  argTypes: {
    target: {
      options: [undefined, 'destructive'],
      control: 'select',
    },
    leadicon: {
      options: [undefined, ...iconName],
      control: 'select',
    },
    tailicon: {
      options: [undefined, ...iconName],
      control: 'select',
    },
    size: {
      options: ['md', 'sm'],
      control: 'select',
    },
  },
};

type Story = StoryObj<typeof meta>;
export default meta;

export const Default: Story = {
  args: {},
};
