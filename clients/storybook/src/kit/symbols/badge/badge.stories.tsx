import type { Meta, StoryObj } from '@storybook/react';

import { Badge, Icon, TIconName, iconName } from '@sellgar/kit';

const meta: Meta<typeof Badge> = {
  title: 'Kit/Symbols/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    stroke: false,
    disabled: false,
    color: 'gray',
    label: 'Badge',
    size: 'lg',
  },
  argTypes: {
    color: {
      options: [
        'gray',
        'blue',
        'green',
        'red',
        'orange',
        'purple',
        'white',
        'surface',
        'white-destructive',
        'surface-destructive',
      ],
      control: 'select',
    },
    shape: {
      options: ['rounded', 'pill'],
      control: 'select',
    },

    leadIcon: {
      options: [undefined, ...iconName],
      control: 'select',
    },
    tailIcon: {
      options: iconName,
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
      <Badge
        {...args}
        leadIcon={<Icon icon={(args.leadIcon as TIconName) ?? 'checkbox-circle-fill'} />}
        tailIcon={<Icon icon={(args.tailIcon as TIconName) ?? 'hashtag'} />}
      />
    );
  },
};
