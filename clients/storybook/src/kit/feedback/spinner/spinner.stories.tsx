import type { Meta, StoryObj } from '@storybook/react-vite';

import { Spinner } from '@sellgar/kit';

const meta: Meta<typeof Spinner> = {
  title: 'Kit/Feedback/Spinner',
  component: Spinner,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

type Story = StoryObj<typeof meta>;
export default meta;

export const Default: Story = {};
