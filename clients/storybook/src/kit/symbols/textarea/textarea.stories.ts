import type { Meta, StoryObj } from '@storybook/react';

import { Textarea } from '@sellgar/kit';

const meta: Meta<typeof Textarea> = {
  title: 'Kit/Symbols/Textarea',
  component: Textarea,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    // value:
    //   'Here you see the three radio buttons, each with the name set to contact and each with a unique value that uniquely identifies that individual radio button within the group',
  },
  argTypes: {},
};

type Story = StoryObj<typeof meta>;
export default meta;

export const Default: Story = {
  args: {},
};
