import React from 'react';

import { InputOtp2 } from '@sellgar/kit';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof InputOtp2> = {
  title: 'Kit/Controls/InputOtp2',
  component: InputOtp2,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    disabled: {
      control: 'boolean',
    },
    length: {
      control: 'number',
    },
    readOnly: {
      control: 'boolean',
    },
    target: {
      options: [undefined, 'destructive'],
      control: 'radio',
    },
  },
  args: {
    length: 6,
    value: '',
  },
};

type Story = StoryObj<typeof meta>;

export default meta;

const ControlledInputOtp2: React.FC<React.ComponentProps<typeof InputOtp2>> = (props) => {
  const [value, setValue] = React.useState(props.value);

  React.useEffect(() => {
    setValue(props.value);
  }, [props.value]);

  return (
    <InputOtp2
      {...props}
      value={value}
      onChange={(nextValue) => {
        setValue(nextValue);
        props.onChange(nextValue);
      }}
    />
  );
};

export const Default: Story = {
  render: (args) => {
    const [value, setValue] = React.useState('018');

    return (
      <div>
        <InputOtp2
          {...args}
          value={value}
          onChange={(nextValue) => {
            setValue(nextValue);
          }}
        />
        <div style={{ marginTop: 8, fontSize: 12 }}>value: {value || '(empty)'}</div>
      </div>
    );
  },
};

export const Empty: Story = {
  args: {
    value: '',
  },
  render: (args) => <ControlledInputOtp2 {...args} />,
};

export const Focused: Story = {
  args: {
    autoFocus: true,
    value: '',
  },
  render: (args) => <ControlledInputOtp2 {...args} />,
};

export const Filled: Story = {
  args: {
    value: '000000',
  },
  render: (args) => <ControlledInputOtp2 {...args} />,
};

export const FilledActive: Story = {
  args: {
    autoFocus: true,
    value: '000000',
  },
  render: (args) => <ControlledInputOtp2 {...args} />,
};

export const DestructiveFocused: Story = {
  args: {
    autoFocus: true,
    target: 'destructive',
    value: '',
  },
  render: (args) => <ControlledInputOtp2 {...args} />,
};

export const DestructiveFilled: Story = {
  args: {
    target: 'destructive',
    value: '000000',
  },
  render: (args) => <ControlledInputOtp2 {...args} />,
};

export const Disabled: Story = {
  args: {
    disabled: true,
    value: '',
  },
  render: (args) => <ControlledInputOtp2 {...args} />,
};
