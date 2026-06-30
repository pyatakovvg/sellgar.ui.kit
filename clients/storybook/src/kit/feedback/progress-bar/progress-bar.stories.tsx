import type { Meta, StoryObj } from '@storybook/react-vite';

import { ProgressBar } from '@sellgar/kit';

const meta: Meta<typeof ProgressBar> = {
  title: 'Kit/Feedback/ProgressBar',
  component: ProgressBar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    min: 0,
    max: 20,
    value: 10,
  },
  argTypes: {},
};

type Story = StoryObj<typeof meta>;
export default meta;

export const Default: Story = {
  args: {},
  render: (args) => {
    return (
      <div style={{ width: 200 }}>
        <ProgressBar {...args} />
      </div>
    );
  },
};
