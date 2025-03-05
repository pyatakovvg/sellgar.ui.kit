import type { Meta, StoryObj } from '@storybook/react';

import { Breadcrumb } from '@sellgar/kit';

const meta: Meta<typeof Breadcrumb> = {
  title: 'Kit/Symbols/Breadcrumb',
  component: Breadcrumb,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    label: 'Label',
    active: false,
    showdivider: true,
    size: 'sm',
    leadicon: 'folder-line',
  },
  argTypes: {
    size: {
      options: ['sm', 'md'],
      control: 'select',
    },
  },
};

type Story = StoryObj<typeof meta>;
export default meta;

export const Default: Story = {
  args: {},
};
