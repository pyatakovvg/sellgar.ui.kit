import type { Meta, StoryObj } from '@storybook/react';

import { QuantityStepper } from '@library/kit';

const meta: Meta<typeof QuantityStepper> = {
  title: 'Kit/Symbols/QuantityStepper',
  component: QuantityStepper,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    value: 23,
    size: 'lg',
    shape: 'rounded',
    outline: false,
    leftActionType: 'subtract',
    leftActionDisabled: false,
    rightActionType: 'add',
    rightActionDisabled: false,
    onLeftActionClick: () => console.log('left click'),
    onRightActionClick: () => console.log('right click'),
  },
  argTypes: {
    size: {
      options: ['lg', 'md'],
      control: 'select',
    },
    shape: {
      options: ['rounded', 'pill'],
      control: 'select',
    },
    leftActionType: {
      options: ['add', 'subtract', 'delete'],
      control: 'select',
    },
    rightActionType: {
      options: ['add', 'subtract', 'delete'],
      control: 'select',
    },
  },
};

type Story = StoryObj<typeof meta>;
export default meta;

export const Default: Story = {
  args: {},
};
