import type { Meta, StoryObj } from '@storybook/react-vite';

import { Icon, iconName } from '@sellgar/kit';

const meta: Meta<typeof Icon> = {
  title: 'Kit/Symbols/Icon',
  component: Icon,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    icon: 'ancient-gate-fill',
  },
  argTypes: {
    icon: {
      options: iconName,
      control: 'select',
    },
  },
};

type Story = StoryObj<typeof meta>;
export default meta;

export const Default: Story = {
  args: {},
};
