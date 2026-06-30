import type { Meta, StoryObj } from '@storybook/react-vite';

import { Textarea } from '@sellgar/kit';

const sizeVariants = ['md', 'xs'] as const;
const stateVariants = [
  { title: 'default', props: {} },
  { title: 'disabled', props: { disabled: true } },
  { title: 'destructive', props: { target: 'destructive' } },
] as const;

const meta: Meta<typeof Textarea> = {
  title: 'Kit/Controls/Textarea',
  component: Textarea,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  args: {
    size: 'md',
    placeholder: 'Введите текст',
  },
  argTypes: {
    size: {
      options: sizeVariants,
      control: 'radio',
    },
    disabled: {
      control: 'boolean',
    },
    target: {
      options: [undefined, 'destructive'],
      control: 'radio',
    },
  },
};

type Story = StoryObj<typeof meta>;

export default meta;

export const Default: Story = {
  render(args) {
    return (
      <div style={{ width: 420 }}>
        <Textarea {...args} />
      </div>
    );
  },
};

export const Sizes: Story = {
  render(args) {
    return (
      <div style={{ display: 'grid', gap: 16, width: 420 }}>
        {sizeVariants.map((size) => (
          <Textarea key={size} {...args} size={size} placeholder={`${size} textarea`} />
        ))}
      </div>
    );
  },
};

export const States: Story = {
  render(args) {
    return (
      <div style={{ display: 'grid', gap: 16, width: 420 }}>
        {stateVariants.map((state) => (
          <Textarea
            key={state.title}
            {...args}
            {...state.props}
            defaultValue={state.title === 'default' ? 'Textarea value' : undefined}
            placeholder={state.title}
          />
        ))}
      </div>
    );
  },
};
