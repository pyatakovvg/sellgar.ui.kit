import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import { Button, EMode } from '@library/kit';

const meta: Meta<typeof Button> = {
  title: 'Kit/Symbols/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: [],
  args: {
    mode: EMode.PRIMARY,
    disabled: false,
    children: 'Click me!',
    onClick: fn(),
  },
  argTypes: {
    mode: {
      options: [EMode.PRIMARY, EMode.SUCCESS, EMode.DANGER],
      control: { type: 'select' },
    },
    disabled: {
      control: { type: 'boolean' },
    },
  },
};

type Story = StoryObj<typeof meta>;
export default meta;

export const Default: Story = {
  args: {},
};

export const Primary: Story = {
  args: {},
};

export const Success: Story = {
  args: {
    mode: EMode.SUCCESS,
  },
};

export const Danger: Story = {
  args: {
    mode: EMode.DANGER,
  },
};
