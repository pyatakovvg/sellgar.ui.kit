import type { Meta, StoryObj } from '@storybook/react-vite';

import { OptionCard } from '@sellgar/kit';

const meta: Meta<typeof OptionCard> = {
  title: 'Kit/Content/OptionCard',
  component: OptionCard,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  args: {
    active: false,
    disabled: false,
    title: 'Option Card',
    description: 'Длинное описание снизу',
  },
  argTypes: {
    active: {
      control: {
        type: 'boolean',
      },
    },
    disabled: {
      control: {
        type: 'boolean',
      },
    },
  },
};

type Story = StoryObj<typeof meta>;
export default meta;

export const Default: Story = {
  render(args: any) {
    return (
      <div style={{ width: 300 }}>
        <OptionCard {...args} />
      </div>
    );
  },
};
