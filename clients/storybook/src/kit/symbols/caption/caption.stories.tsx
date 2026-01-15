import type { Meta, StoryObj } from '@storybook/react-vite';

import { Caption, iconName } from '@sellgar/kit';

import { iconMapping } from '../../../utils/iconMapping.tsx';

const meta: Meta<typeof Caption> = {
  title: 'Kit/Symbols/Caption',
  component: Caption,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    leadIcon: null,
    caption: 'Helper field',
    state: 'default',
  },
  argTypes: {
    state: {
      options: ['default', 'success', 'destructive'],
      control: 'select',
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
