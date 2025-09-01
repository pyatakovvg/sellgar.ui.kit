import type { Meta, StoryObj } from '@storybook/react';

import { ToolTip } from '@sellgar/kit/development';

const meta: Meta<typeof ToolTip> = {
  title: 'Kit/Symbols/ToolTip',
  component: ToolTip,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    open: true,
    initialOpen: true,
  },
  argTypes: {
    initialOpen: {
      control: 'boolean',
    },
    size: {
      options: ['sm', 'md'],
      control: 'select',
    },
    placement: {
      options: [
        undefined,
        'top',
        'right',
        'bottom',
        'left',
        'top-start',
        'top-end',
        'right-start',
        'right-end',
        'bottom-start',
        'bottom-end',
        'left-start',
        'left-end',
      ],
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
      <ToolTip {...args}>
        <ToolTip.Trigger />
        <ToolTip.Content>
          <ToolTip.Content.Label>Tooltip headline</ToolTip.Content.Label>
          <ToolTip.Content.Caption>Tooltips display informative text when users hover over, focus on, or tap an element</ToolTip.Content.Caption>
        </ToolTip.Content>
      </ToolTip>
    );
  },
};
