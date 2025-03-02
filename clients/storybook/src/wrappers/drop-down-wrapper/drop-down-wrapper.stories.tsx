import type { Meta, StoryObj } from '@storybook/react';

import { DropDownWrapper } from '@sellgar/kit';

const meta: Meta = {
  title: 'Kit/Wrappers/DropDownWrapper',
  component: DropDownWrapper,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    disabled: false,
    destructive: false,
  },
  argTypes: {},
};

type Story = StoryObj<typeof meta>;
export default meta;

export const Default: Story = {
  args: {},
  render: () => (
    <DropDownWrapper>
      <p>kjhkjhjkk</p>
    </DropDownWrapper>
  ),
};
