import type { Meta, StoryObj } from '@storybook/react-vite';

import { Radio } from '@sellgar/kit';

const sizeVariants = ['md', 'sm'] as const;
const stateVariants = [
  { title: 'unchecked', props: { checked: false } },
  { title: 'checked', props: { checked: true } },
  { title: 'disabled unchecked', props: { checked: false, disabled: true } },
  { title: 'disabled checked', props: { checked: true, disabled: true } },
] as const;

const meta: Meta<typeof Radio> = {
  title: 'Kit/Controls/Radio',
  component: Radio,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  args: {
    checked: false,
    disabled: false,
    label: 'Radio',
    caption: 'Описание варианта',
    size: 'md',
    readOnly: true,
  },
  argTypes: {
    size: {
      options: sizeVariants,
      control: 'radio',
    },
    checked: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
  },
};

type Story = StoryObj<typeof meta>;

export default meta;

export const Default: Story = {};

export const States: Story = {
  render(args) {
    return (
      <div style={{ display: 'grid', gap: 16 }}>
        {stateVariants.map((state) => (
          <Radio
            key={state.title}
            {...args}
            {...state.props}
            label={state.title}
            caption={'Radio state'}
            name={'radio-states'}
            readOnly
          />
        ))}
      </div>
    );
  },
};

export const Sizes: Story = {
  render(args) {
    return (
      <div style={{ display: 'grid', gap: 16 }}>
        {sizeVariants.map((size) => (
          <Radio
            key={size}
            {...args}
            size={size}
            checked
            label={`${size} radio`}
            caption={'Размер с label и caption'}
            name={`radio-${size}`}
            readOnly
          />
        ))}
      </div>
    );
  },
};

export const Matrix: Story = {
  render(args) {
    return (
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, minmax(160px, max-content))',
          gap: 24,
          alignItems: 'start',
        }}
      >
        {sizeVariants.flatMap((size) =>
          stateVariants.map((state) => (
            <Radio
              key={`${size}-${state.title}`}
              {...args}
              {...state.props}
              size={size}
              label={'Radio label'}
              caption={`${size} ${state.title}`}
              name={`${size}-${state.title}`}
              readOnly
            />
          )),
        )}
      </div>
    );
  },
};

export const KeyboardFocus: Story = {
  args: {
    autoFocus: true,
    checked: true,
    label: 'Radio label',
    caption: 'Фокус через клавиатуру',
    name: 'radio-keyboard-focus',
  },
};
