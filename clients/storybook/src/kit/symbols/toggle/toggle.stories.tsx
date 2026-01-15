import type { Meta, StoryObj } from '@storybook/react-vite';

import { Toggle } from '@sellgar/kit';

const meta: Meta<typeof Toggle> = {
  title: 'Kit/Symbols/Toggle',
  component: Toggle,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    checked: false,
    disabled: false,
    label: 'Toggle',
    caption: 'Описание для переключателя',
  },
  argTypes: {
    size: {
      options: ['sm', 'md'],
      control: 'select',
    },
    checked: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
  },
};

type Story = StoryObj<typeof meta>;
export default meta;

export const Default: Story = {
  args: {},
};
