import type { Meta, StoryObj } from '@storybook/react-vite';

import { Badge, Option } from '@sellgar/kit';
import { UserLineIcon } from '@sellgar/kit/icons';

const meta: Meta<typeof Option> = {
  title: 'Kit/Navigation/Option',
  component: Option,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  args: {
    label: 'Иванов Иван Иванович',
    active: true,
    toggle: true,
    leadIcon: <UserLineIcon />,
    badge: <Badge label={'Адм.'} />,
  },
  argTypes: {
    leadIcon: {
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

export const WithoutToggle: Story = {
  args: {
    toggle: undefined,
    active: false,
  },
};
