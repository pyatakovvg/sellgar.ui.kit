import type { Meta, StoryObj } from '@storybook/react-vite';

import { Notification, LinkTypography } from '@sellgar/kit';

const meta: Meta<typeof Notification.Static> = {
  title: 'Kit/Feedback/Notification/Static',
  component: Notification.Static,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    status: 'info',
    title: 'Title',
    description: (
      <>
        Here you see the three radio{' '}
        <LinkTypography>
          <a href={'#'}>buttons</a>
        </LinkTypography>
        , each with the name set to contact and each with a unique value that uniquely identifies that individual radio
        button within the group.
      </>
    ),
  },
  argTypes: {
    status: {
      options: ['info', 'warning', 'success', 'destructive'],
      control: 'radio',
    },
    description: {
      control: false,
    },
  },
};

type Story = StoryObj<typeof meta>;
export default meta;

export const Default: Story = {
  args: {},
};
