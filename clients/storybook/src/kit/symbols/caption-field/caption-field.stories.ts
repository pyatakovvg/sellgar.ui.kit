import type { Meta, StoryObj } from '@storybook/react';

import { CaptionField } from '@sellgar/kit/development';

const meta: Meta<typeof CaptionField> = {
  title: 'Kit/Symbols/CaptionField',
  component: CaptionField,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    leadIcon: 'information-line',
    caption: 'Helper field',
    state: 'default',
  },
  argTypes: {
    state: {
      options: ['default', 'success', 'destructive'],
      control: 'select',
    },
  },
};

type Story = StoryObj<typeof meta>;
export default meta;

export const Default: Story = {
  args: {},
};
