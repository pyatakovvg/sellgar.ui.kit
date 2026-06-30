import type { Meta, StoryObj } from '@storybook/react-vite';

import { Toggle } from '@sellgar/kit';

const sizeVariants = ['md', 'sm'] as const;
const stateVariants = [
  { title: 'off', props: { checked: false } },
  { title: 'on', props: { checked: true } },
  { title: 'disabled off', props: { checked: false, disabled: true } },
  { title: 'disabled on', props: { checked: true, disabled: true } },
] as const;

const meta: Meta<typeof Toggle> = {
  title: 'Kit/Controls/Toggle',
  component: Toggle,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  args: {
    checked: false,
    disabled: false,
    label: 'Toggle',
    caption: 'Описание переключателя',
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
          <Toggle key={state.title} {...args} {...state.props} label={state.title} caption={'Toggle state'} readOnly />
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
          <Toggle
            key={size}
            {...args}
            size={size}
            checked
            label={`${size} toggle`}
            caption={'Размер с label и caption'}
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
            <Toggle
              key={`${size}-${state.title}`}
              {...args}
              {...state.props}
              size={size}
              label={'Toggle label'}
              caption={`${size} ${state.title}`}
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
    label: 'Toggle label',
    caption: 'Фокус через клавиатуру',
  },
};
