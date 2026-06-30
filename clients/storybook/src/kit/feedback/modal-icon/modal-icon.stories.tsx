import type { Meta, StoryObj } from '@storybook/react-vite';

import { ModalIcon } from '@sellgar/kit';

const meta: Meta<typeof ModalIcon> = {
  title: 'Kit/Feedback/ModalIcon',
  component: ModalIcon,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    icon: 'ancient-gate-fill',
    shape: 'rounded',
    size: 'xl',
    type: 'default',
  },
  argTypes: {
    type: {
      options: ['default', 'success', 'error', 'warning'],
      control: 'select',
    },
    shape: {
      options: ['rounded', 'pill'],
      control: 'select',
    },
    size: {
      options: ['s', 'xl'],
      control: 'select',
    },
  },
};

type Story = StoryObj<typeof meta>;
export default meta;

export const Default: Story = {
  args: {},
};
