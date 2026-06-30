import type { Meta, StoryObj } from '@storybook/react-vite';

import { Divider } from '@sellgar/kit';

const meta: Meta<typeof Divider> = {
  title: 'Kit/Layout/Divider',
  component: Divider,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
  args: {
    type: void 0,
    label: 'Label',
    actionLabel: 'Add',
  },
  argTypes: {
    type: {
      control: {
        type: 'radio',
      },
      options: [undefined, 'label-left', 'label-center', 'action-center'],
    },
  },
};

type Story = StoryObj<typeof meta>;
export default meta;

// @ts-ignore
export const Default: Story = {
  render: (args) => <Divider {...args} />,
};
