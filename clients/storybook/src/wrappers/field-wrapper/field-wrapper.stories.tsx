import type { Meta, StoryObj } from '@storybook/react-vite';

import { Field, Label, Input, Icon, Caption } from '@sellgar/kit';

const meta: Meta = {
  title: 'Kit/Wrappers/Field',
  component: Field,
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
    <Field>
      <Field.Label>
        <Label label={'Label'} caption={'(optional)'} required={true} />
      </Field.Label>
      <Field.Content>
        <Input
          size={'md'}
          leadIcon={<Icon icon={Icon.earthLine} />}
          badge={'⌘K'}
          tailIcon={<Icon icon={Icon.informationLine} />}
          disabled={args.disabled}
          target={args.destructive ? 'destructive' : undefined}
        />
      </Field.Content>
      <Field.Caption>
        <Caption leadIcon={<Icon icon={Icon.informationLine} />} caption={'Helper text'} state={args.destructive ? 'destructive' : 'default'} />
      </Field.Caption>
    </Field>
  ),
};
