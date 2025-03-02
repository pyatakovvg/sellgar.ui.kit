import type { Meta, StoryObj } from '@storybook/react';

import { Chip, Avatar, iconName } from '@sellgar/kit';

const meta: Meta<typeof Chip> = {
  title: 'Kit/Symbols/Chip',
  component: Chip,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    disabled: false,
    isActive: false,
    label: 'Label',
    size: 'lg',
  },
  argTypes: {
    shape: {
      options: ['rounded', 'pill'],
      control: 'select',
    },
    leadicon: {
      options: [undefined, ...iconName],
      control: 'select',
    },
    size: {
      options: ['lg', 'md', 'sm'],
      control: 'select',
    },
    label: {
      control: 'text',
    },
  },
};

type Story = StoryObj<typeof meta>;
export default meta;

export const Default: Story = {
  args: {},
  render: (args) => {
    return (
      <div>
        <div>
          <Chip {...args} type={'icon'} leadicon={'checkbox-circle-fill'} />
        </div>
        <div style={{ marginTop: '10px' }}>
          <Chip {...args} type={'slot'} leadslot={<Avatar size={'xs'} color={'green'} />} />
        </div>
      </div>
    );
  },
};
