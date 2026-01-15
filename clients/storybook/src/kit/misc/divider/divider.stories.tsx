import type { Meta, StoryObj } from '@storybook/react-vite';

import { Divider } from '@sellgar/kit';

const meta: Meta<typeof Divider> = {
  title: 'Kit/Misc/Divider',
  component: Divider,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

type Story = StoryObj<typeof meta>;
export default meta;

// @ts-ignore
export const Default: Story = {
  // @ts-ignore
  args: {
    type: undefined,
  },
};

export const Left: Story = {
  args: {
    // @ts-ignore
    type: 'label-left',
  },
};
