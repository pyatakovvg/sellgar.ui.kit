import type { Meta, StoryObj } from '@storybook/react-vite';

import { InputMask, Badge } from '@sellgar/kit';
import { CalendarLineIcon, PhoneLineIcon } from '@sellgar/kit/icons';

const meta: Meta<typeof InputMask> = {
  title: 'Kit/Controls/InputMask',
  component: InputMask,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  args: {
    size: 'md',
    placeholder: '+7 (___) ___-__-__',
    mask: '+_ (___) ___-__-__',
    replacement: { _: /\d/ },
    showMask: true,
    leadIcon: <PhoneLineIcon />,
    badge: <Badge label={'RU'} />,
  },
  argTypes: {
    size: {
      options: ['xs', 'md'],
      control: 'radio',
    },
    target: {
      options: [undefined, 'destructive'],
      control: 'radio',
    },
    leadIcon: {
      control: false,
    },
    badge: {
      control: false,
    },
  },
};

type Story = StoryObj<typeof meta>;
export default meta;

export const Default: Story = {};

export const DateMask: Story = {
  args: {
    placeholder: 'ДД.ММ.ГГГГ',
    mask: '__.__.____',
    replacement: { _: /\d/ },
    showMask: true,
    leadIcon: <CalendarLineIcon />,
    badge: undefined,
  },
};
