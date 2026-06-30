import type { Meta, StoryObj } from '@storybook/react-vite';

import { Badge, MenuItem, iconName } from '@sellgar/kit';
import { ArrowRightSLineIcon, DashboardLineIcon } from '@sellgar/kit/icons';

const meta: Meta<typeof MenuItem> = {
  title: 'Kit/Navigation/MenuItem',
  component: MenuItem,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  args: {
    caption: 'Панель управления',
    leadIcon: <DashboardLineIcon />,
    tailIcon: <ArrowRightSLineIcon />,
    isActive: false,
    isPending: false,
    badge: <Badge label={'12'} />,
  },
  argTypes: {
    badge: {
      control: false,
    },
    leadIcon: {
      control: {
        type: 'select',
      },
      options: Object.values(iconName),
    },
    tailIcon: {
      control: {
        type: 'select',
      },
      options: Object.values(iconName),
    },
  },
};

type Story = StoryObj<typeof meta>;
export default meta;

export const Default: Story = {
  render: (args) => (
    <div style={{ width: 280 }}>
      <MenuItem {...args} />
    </div>
  ),
};

export const Pending: Story = {
  args: {
    isPending: true,
    tailIcon: undefined,
  },
  render: (args) => (
    <div style={{ width: 280 }}>
      <MenuItem {...args} />
    </div>
  ),
};
