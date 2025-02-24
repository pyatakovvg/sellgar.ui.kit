import type { Meta, StoryObj } from '@storybook/react';

import { CaptionField } from '@library/kit';

const meta: Meta<typeof CaptionField> = {
  title: 'Kit/Symbols/CaptionField',
  component: CaptionField,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    leadicon: 'information-line',
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
