import type { Meta, StoryObj } from '@storybook/react';

import { Datepicker, Icon, ToolTip } from '@sellgar/kit/development';
import React from 'react';

const meta: Meta<typeof Datepicker> = {
  title: 'Kit/Symbols/Datepicker',
  component: Datepicker,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    disabled: false,
    isClearable: true,
    displayFormat: 'DD.MM.YYYY HH:mm',
    value: '1985-10-13T00:00:00.000+03:00',
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
  },
  argTypes: {
    disabled: {
      control: 'boolean',
    },
    isClearable: {
      control: 'boolean',
    },
    displayFormat: {
      control: 'text',
    },
    value: {
      control: 'text',
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
  render(args) {
    const [value, setValue] = React.useState<string | undefined>(args.value);

    return (
      <div style={{ width: '360px' }}>
        <p>{value}</p>
        <Datepicker {...args} value={value} onChange={setValue} />
      </div>
    );
  },
};
