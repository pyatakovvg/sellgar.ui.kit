import type { Meta, StoryObj } from '@storybook/react';

import { FieldWrapper, LabelField, Input, CaptionField } from '@sellgar/kit/development';

const meta: Meta = {
  title: 'Kit/Wrappers/FieldWrapper',
  component: FieldWrapper,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    disabled: false,
    destructive: false,
  },
  argTypes: {},
};

type Story = StoryObj<typeof meta>;
export default meta;

export const Default: Story = {
  args: {},
  render: (args) => (
    <FieldWrapper>
      <FieldWrapper.Label>
        <LabelField label={'Label'} caption={'(optional)'} required={true} />
      </FieldWrapper.Label>
      <FieldWrapper.Content>
        <Input
          size={'md'}
          leadicon={'earth-line'}
          badge={'⌘K'}
          tailicon={'information-line'}
          disabled={args.disabled}
          target={args.destructive ? 'destructive' : undefined}
        />
      </FieldWrapper.Content>
      <FieldWrapper.Caption>
        <CaptionField leadicon={'information-line'} caption={'Helper text'} state={args.destructive ? 'destructive' : 'default'} />
      </FieldWrapper.Caption>
    </FieldWrapper>
  ),
};
