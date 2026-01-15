import type { Meta, StoryObj } from '@storybook/react-vite';

import { Badge, iconName } from '@sellgar/kit';

import { iconMapping } from '../../../utils/iconMapping.tsx';

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
    label: 'Badge',
    color: 'gray',
    size: 'lg',
    leadIcon: null,
    tailIcon: null,
  },
  argTypes: {
    color: {
      options: ['gray', 'blue', 'green', 'red', 'orange', 'purple', 'white', 'surface', 'white-destructive', 'surface-destructive'],
      control: {
        type: 'select',
      },
    },
    shape: {
      options: ['rounded', 'pill'],
      control: {
        type: 'radio',
      },
    },
    leadIcon: {
      control: {
        type: 'select',
        labels: {
          null: 'не использовать',
        },
      },
      options: [null, ...Object.values(iconName)],
      value: iconName.copyleftLine,
      mapping: iconMapping,
    },
    tailIcon: {
      control: {
        type: 'select',
        labels: {
          null: 'не использовать',
        },
      },
      options: [null, ...Object.values(iconName)],
      value: iconName.copyleftLine,
      mapping: iconMapping,
    },
    size: {
      control: {
        type: 'radio',
        labels: {
          lg: 'large',
          md: 'middle',
          sm: 'small',
          xs: 'extra-small',
        },
      },
      options: ['lg', 'md', 'sm', 'xs'],
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
    return <Badge {...args} leadIcon={args.leadIcon ? args.leadIcon : undefined} tailIcon={args.tailIcon ? args.tailIcon : undefined} />;
  },
};
