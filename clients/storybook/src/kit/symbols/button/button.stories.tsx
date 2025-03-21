import type { Meta, StoryObj } from '@storybook/react';

import { Button, Icon, TIconName, iconName } from '@sellgar/kit';

const meta: Meta<typeof Button> = {
  title: 'Kit/Symbols/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    style: 'primary',
    children: 'Button',
    size: 'lg',
    disabled: false,
    target: 'default',
  },
  argTypes: {
    shape: {
      options: ['rounded', 'pill'],
      control: 'select',
    },
    target: {
      options: ['default', 'destructive', 'success', 'info'],
      control: 'select',
      type: 'string',
    },
    leadIcon: {
      options: [undefined, ...iconName],
      control: 'select',
    },
    tailIcon: {
      options: iconName,
      control: 'select',
    },
    style: {
      options: ['primary', 'secondary', 'tertiary', 'ghost'],
      control: 'select',
    },
    size: {
      options: ['lg', 'md', 'sm', 'xs'],
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
  render(args) {
    return (
      <div style={{ textAlign: 'center' }}>
        <div>
          <Button
            {...args}
            leadIcon={<Icon icon={(args.leadIcon as TIconName) ?? 'scan-line'} />}
            tailIcon={<Icon icon={(args.tailIcon as TIconName) ?? 'arrow-right-line'} />}
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', width: 300, marginTop: 16 }}>
          <Button
            {...args}
            leadIcon={<Icon icon={(args.leadIcon as TIconName) ?? 'scan-line'} />}
            tailIcon={<Icon icon={(args.tailIcon as TIconName) ?? 'arrow-right-line'} />}
          />
        </div>
      </div>
    );
  },
};
