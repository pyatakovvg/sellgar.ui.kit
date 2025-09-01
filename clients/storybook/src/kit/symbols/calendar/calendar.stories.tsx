import type { Meta, StoryObj } from '@storybook/react';

import { Calendar, DropDownWrapper } from '@sellgar/kit/development';
import React from 'react';

const meta: Meta<typeof Calendar> = {
  title: 'Kit/Symbols/Calendar',
  component: Calendar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {},
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
    const [value, setValue] = React.useState<string | undefined>('2024-02-02T23:55:00.000Z');

    return (
      <div style={{ minHeight: '300px' }}>
        <p>{value}</p>
        <DropDownWrapper>
          <div style={{ padding: '10px 12px' }}>
            <Calendar {...args} value={value} onChange={(value) => setValue(value)} />
          </div>
        </DropDownWrapper>
      </div>
    );
  },
};
