import type { Meta, StoryObj } from '@storybook/react-vite';

import { Breadcrumb, iconName } from '@sellgar/kit';

import { iconMapping } from '../../../utils/iconMapping.tsx';

const meta: Meta<typeof Breadcrumb> = {
  title: 'Kit/Symbols/Breadcrumb',
  component: Breadcrumb,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    label: 'Label',
    active: false,
    showDivider: true,
    size: 'sm',
    leadIcon: null,
  },
  argTypes: {
    label: {
      control: {
        type: 'text',
      },
    },
    active: {
      control: {
        type: 'boolean',
      },
    },
    showDivider: {
      control: {
        type: 'boolean',
      },
    },
    size: {
      options: ['sm', 'md'],
      control: {
        type: 'radio',
        labels: {
          sm: 'small',
          md: 'middle',
        },
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
  },
};

type Story = StoryObj<typeof meta>;
export default meta;

export const Default: Story = {
  args: {},
};
