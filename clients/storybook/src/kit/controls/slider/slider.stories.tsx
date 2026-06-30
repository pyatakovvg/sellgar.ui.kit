import type { Meta, StoryObj } from '@storybook/react-vite';

import { Slider } from '@sellgar/kit';

const meta: Meta<typeof Slider> = {
  title: 'Kit/Controls/Slider',
  component: Slider,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  args: {
    defaultValue: 50,
    min: 0,
    max: 100,
    step: 1,
  },
  argTypes: {
    defaultValue: {
      control: 'number',
    },
    min: {
      control: 'number',
    },
    max: {
      control: 'number',
    },
    step: {
      control: 'number',
    },
  },
};

type Story = StoryObj<typeof meta>;

export default meta;

export const Default: Story = {
  render(args) {
    return (
      <div style={{ width: 240 }}>
        <Slider {...args} />
      </div>
    );
  },
};

export const Values: Story = {
  render(args) {
    return (
      <div style={{ display: 'grid', gap: 24, width: 240 }}>
        {[0, 25, 50, 75, 100].map((value) => (
          <Slider key={value} {...args} defaultValue={value} />
        ))}
      </div>
    );
  },
};

export const Range: Story = {
  render(args) {
    return (
      <div style={{ width: 240 }}>
        <Slider {...args} defaultValue={[20, 80]} />
      </div>
    );
  },
};
