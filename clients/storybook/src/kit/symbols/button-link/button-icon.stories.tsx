import type { Meta, StoryObj } from '@storybook/react';

import { ButtonLink, Icon, TIconName, iconName } from '@sellgar/kit';

const meta: Meta<typeof ButtonLink> = {
  title: 'Kit/Symbols/ButtonLink',
  component: ButtonLink,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    size: 'md',
    label: '16',
    children: 'Button link',
    disabled: false,
  },
  argTypes: {
    target: {
      options: [undefined, 'destructive'],
      control: 'select',
    },
    leadIcon: {
      options: [undefined, ...iconName],
      control: 'select',
    },
    tailIcon: {
      options: [undefined, ...iconName],
      control: 'select',
    },
    size: {
      options: ['md', 'sm'],
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
      <ButtonLink
        {...args}
        leadIcon={<Icon icon={(args.leadIcon as TIconName) ?? 'scan-line'} />}
        tailIcon={<Icon icon={(args.tailIcon as TIconName) ?? 'arrow-right-line'} />}
      />
    );
  },
};
