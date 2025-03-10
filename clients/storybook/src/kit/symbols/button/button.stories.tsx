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
  },
  argTypes: {
    shape: {
      options: ['rounded', 'pill'],
      control: 'select',
    },
    target: {
      options: [undefined, 'destructive'],
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
      <Button
        {...args}
        leadIcon={<Icon icon={(args.leadIcon as TIconName) ?? 'scan-line'} />}
        tailIcon={<Icon icon={(args.tailIcon as TIconName) ?? 'arrow-right-line'} />}
      />
    );
  },
};
