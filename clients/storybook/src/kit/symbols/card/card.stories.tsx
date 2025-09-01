import type { Meta, StoryObj } from '@storybook/react';

import { Card } from '@sellgar/kit/development';

const meta: Meta<typeof Card> = {
  title: 'Kit/Symbols/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    type: 'custom',
  },
  argTypes: {
    target: {
      options: [undefined, 'inverted'],
      control: 'select',
    },
    type: {
      options: ['custom', 'elevated', 'flat'],
      control: 'select',
    },
    alignment: {
      options: ['image-first', 'content-first'],
      control: 'select',
    },
  },
};

type Story = StoryObj<typeof meta>;
export default meta;

export const Default: Story = {
  args: {},
  render: (args) => {
    return (
      <Card {...args} image={<div />}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            flex: '1 0 auto',
            height: '100px',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '12px',
            border: '1px dashed #924FE8',
            background: '#ECDFFB',
            color: '#5314A3',
            boxShadow: '0 1px 2px 0 rgba(20, 21, 26, 0.05)',
          }}
        >
          <p>Slot</p>
        </div>
      </Card>
    );
  },
};
