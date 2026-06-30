import type { Meta, StoryObj } from '@storybook/react-vite';

import { Checkbox } from '@sellgar/kit';

const sizeVariants = ['md', 'sm'] as const;
const stateVariants = [
  { title: 'unchecked', props: { checked: false } },
  { title: 'checked', props: { checked: true } },
  { title: 'indeterminate', props: { isIndeterminate: true } },
  { title: 'unchecked disabled', props: { checked: false, disabled: true } },
  { title: 'disabled', props: { checked: true, disabled: true } },
  { title: 'indeterminate disabled', props: { isIndeterminate: true, disabled: true } },
] as const;
const matrixStateVariants = [
  { title: 'unchecked', props: { checked: false } },
  { title: 'checked', props: { checked: true } },
  { title: 'indeterminate', props: { isIndeterminate: true } },
] as const;
const matrixGroupVariants = [
  { title: 'Enabled', props: { disabled: false } },
  { title: 'Disabled', props: { disabled: true } },
] as const;

const meta: Meta<typeof Checkbox> = {
  title: 'Kit/Controls/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  args: {
    checked: false,
    disabled: false,
    label: 'Checkbox',
    caption: 'Описание параметра',
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
    isIndeterminate: {
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
          <Checkbox
            key={state.title}
            {...args}
            {...state.props}
            label={state.title}
            caption={'Checkbox state'}
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
          <Checkbox
            key={size}
            {...args}
            size={size}
            checked
            label={`${size} checkbox`}
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
          gap: 28,
          maxWidth: 760,
        }}
      >
        {matrixGroupVariants.map((group) => (
          <section key={group.title} style={{ display: 'grid', gap: 16 }}>
            <h3 style={{ margin: 0, fontSize: 14, lineHeight: '20px', fontWeight: 600 }}>{group.title}</h3>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, minmax(160px, 1fr))',
                gap: 20,
                alignItems: 'start',
              }}
            >
              {sizeVariants.flatMap((size) =>
                matrixStateVariants.map((state) => (
                  <Checkbox
                    key={`${group.title}-${size}-${state.title}`}
                    {...args}
                    {...group.props}
                    {...state.props}
                    size={size}
                    label={state.title}
                    caption={size}
                    readOnly
                  />
                )),
              )}
            </div>
          </section>
        ))}
      </div>
    );
  },
};

export const KeyboardFocus: Story = {
  args: {
    autoFocus: true,
    checked: true,
    label: 'Checkbox label',
    caption: 'Фокус через клавиатуру',
  },
};
