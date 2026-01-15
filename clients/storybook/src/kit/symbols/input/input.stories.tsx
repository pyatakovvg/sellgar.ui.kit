import type { Meta, StoryObj } from '@storybook/react-vite';

import { Input, Icon, ToolTip } from '@sellgar/kit';

const meta: Meta<typeof Input> = {
  title: 'Kit/Symbols/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    leadIcon: <Icon icon={'earth-line'} />,
    tailIcon: (
      <ToolTip>
        <ToolTip.Trigger>
          <Icon icon={'information-line'} />
        </ToolTip.Trigger>
        <ToolTip.Content>
          <ToolTip.Content.Label>Tooltip headline</ToolTip.Content.Label>
          <ToolTip.Content.Caption>Tooltips display informative text when users hover over, focus on, or tap an element</ToolTip.Content.Caption>
        </ToolTip.Content>
      </ToolTip>
    ),
    badge: '⌘K',
    placeholder: 'Напиши что-нибудь...',
  },
  argTypes: {
    size: {
      options: ['xs', 'md'],
      control: 'select',
    },
    disabled: {
      control: 'boolean',
    },
    target: {
      options: [undefined, 'destructive'],
      control: 'select',
    },
  },
};

type Story = StoryObj<typeof meta>;
export default meta;

export const Default: Story = {
  args: {},
};
