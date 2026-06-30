import type { Meta, StoryObj } from '@storybook/react-vite';

import { Badge, ButtonLink } from '@sellgar/kit';
import { ArrowRightLineIcon, ScanLineIcon } from '@sellgar/kit/icons';

const meta: Meta<typeof ButtonLink> = {
  title: 'Kit/Action/ButtonLink',
  component: ButtonLink,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  args: {
    children: 'Открыть детали',
    size: 'md',
    target: 'default',
    disabled: false,
    leadIcon: <ScanLineIcon />,
    tailIcon: <ArrowRightLineIcon />,
    badge: <Badge label={'16'} />,
  },
  argTypes: {
    size: {
      options: ['md', 'sm', 'xs'],
      control: 'radio',
    },
    target: {
      options: ['default', 'destructive', 'success', 'info'],
      control: 'select',
    },
    leadIcon: {
      control: false,
    },
    tailIcon: {
      control: false,
    },
    badge: {
      control: false,
    },
  },
};

type Story = StoryObj<typeof meta>;
export default meta;

export const Default: Story = {};

export const WithoutBadge: Story = {
  args: {
    badge: undefined,
    children: 'Перейти',
  },
};
