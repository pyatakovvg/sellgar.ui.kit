import type { Meta, StoryObj } from '@storybook/react';

import { Divider } from '@library/kit';

const meta: Meta<typeof Divider> = {
  title: 'Kit/Misc/Divider',
  component: Divider,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: { type: 'default' },
  argTypes: {},
};

type Story = StoryObj<typeof meta>;
export default meta;

export const Default: Story = {
  args: {
    type: 'default',
  },
  render: () => {
    return (
      <div style={{ width: 200 }}>
        <div style={{ marginTop: 19 }}>
          <Divider />
        </div>
        <div style={{ marginTop: 19 }}>
          <Divider type={'label-left'} label={'or'} />
        </div>
        <div style={{ marginTop: 19 }}>
          <Divider type={'label-center'} label={'or'} />
        </div>
        <div style={{ marginTop: 19 }}>
          <Divider type={'action-center'} actionLabel={'Add'} />
        </div>
      </div>
    );
  },
};
