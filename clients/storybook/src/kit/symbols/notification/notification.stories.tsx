import type { Meta, StoryObj } from '@storybook/react';

import { Notification, Link } from '@sellgar/kit';

const meta: Meta<typeof Notification> = {
  title: 'Kit/Symbols/Notification',
  component: Notification,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    style: 'info',
    title: 'Title',
    description: (
      <>
        Here you see the three radio{' '}
        <Link>
          <a href={'#'}>buttons</a>
        </Link>
        , each with the name set to contact and each with a unique value that uniquely identifies that individual radio
        button within the group.
      </>
    ),
  },
  argTypes: {
    style: {
      options: ['info', 'warning', 'success', 'destructive'],
      control: 'select',
    },
  },
};

type Story = StoryObj<typeof meta>;
export default meta;

export const Default: Story = {
  args: {},
};
