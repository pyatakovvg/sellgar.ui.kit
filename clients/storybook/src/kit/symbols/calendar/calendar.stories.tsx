import type { Meta, StoryObj } from '@storybook/react';

import { Calendar, DropDownWrapper } from '@sellgar/kit';

const meta: Meta<typeof Calendar> = {
  title: 'Kit/Symbols/Calendar',
  component: Calendar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    defaultValue: '2024-02-02T12:54:00.000Z',
    value: undefined,
  },
  argTypes: {
    value: {
      type: 'string',
    },
  },
};

type Story = StoryObj<typeof meta>;
export default meta;

export const Default: Story = {
  args: {},
  render(args) {
    return (
      <div style={{ minHeight: '300px' }}>
        <DropDownWrapper>
          <div style={{ padding: '10px 12px' }}>
            <Calendar {...args} />
          </div>
        </DropDownWrapper>
      </div>
    );
  },
};
