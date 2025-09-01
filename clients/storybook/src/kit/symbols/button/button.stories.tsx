import type { Meta, StoryObj } from '@storybook/react';

import { Button, Icon, Badge, TIconName, iconName } from '@sellgar/kit/development';

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
            badge={<Badge leadIcon={<Icon icon={'money-dollar-circle-line'} />} label={'RU'} />}
            leadIcon={<Icon icon={(args.leadIcon as TIconName) ?? 'scan-line'} />}
            tailIcon={<Icon icon={(args.tailIcon as TIconName) ?? 'arrow-right-line'} />}
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', width: 300, marginTop: 16 }}>
          <Button
            {...args}
            badge={<Badge label={'12'} />}
            leadIcon={<Icon icon={(args.leadIcon as TIconName) ?? 'scan-line'} />}
            tailIcon={<Icon icon={(args.tailIcon as TIconName) ?? 'arrow-right-line'} />}
          />
        </div>
      </div>
    );
  },
};
