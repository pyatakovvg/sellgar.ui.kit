import type { Meta, StoryObj } from '@storybook/react-vite';

import { Badge, Input } from '@sellgar/kit';
import {
  ArrowRightLineIcon,
  EarthLineIcon,
  FileCopyLineIcon,
  InformationLineIcon,
  SearchLineIcon,
} from '@sellgar/kit/icons';

const sizeVariants = ['md', 'xs'] as const;
const stateVariants = [
  { title: 'default', props: {} },
  { title: 'disabled', props: { disabled: true } },
  { title: 'destructive', props: { target: 'destructive' } },
] as const;

const meta: Meta<typeof Input> = {
  title: 'Kit/Controls/Input',
  component: Input,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  args: {
    inputType: 'default',
    size: 'md',
    placeholder: 'Напишите значение',
  },
  argTypes: {
    inputType: {
      options: ['default', 'borderless'],
      control: 'radio',
    },
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
    leadIcon: {
      control: false,
    },
    tailIcon: {
      control: false,
    },
    badge: {
      control: false,
    },
    button: {
      control: false,
    },
  },
};

type Story = StoryObj<typeof meta>;

export default meta;

export const Default: Story = {
  args: {
    leadIcon: <EarthLineIcon />,
    tailIcon: <InformationLineIcon />,
    badge: <Badge label={'⌘K'} />,
  },
  render(args) {
    return (
      <div style={{ width: 360 }}>
        <Input {...args} />
      </div>
    );
  },
};

export const Sizes: Story = {
  render(args) {
    return (
      <div style={{ display: 'grid', gap: 16, width: 360 }}>
        {sizeVariants.map((size) => (
          <Input key={size} {...args} size={size} leadIcon={<SearchLineIcon />} placeholder={`${size} input`} />
        ))}
      </div>
    );
  },
};

export const States: Story = {
  render(args) {
    return (
      <div style={{ display: 'grid', gap: 16, width: 360 }}>
        {stateVariants.map((state) => (
          <Input
            key={state.title}
            {...args}
            {...state.props}
            leadIcon={<SearchLineIcon />}
            tailIcon={<InformationLineIcon />}
            placeholder={state.title}
          />
        ))}
      </div>
    );
  },
};

export const WithActions: Story = {
  render(args) {
    return (
      <div style={{ display: 'grid', gap: 16, width: 420 }}>
        <Input
          {...args}
          leadIcon={<SearchLineIcon />}
          placeholder={'Input with button'}
          button={<Input.Button>Поиск</Input.Button>}
        />
        <Input
          {...args}
          placeholder={'Input with tail action'}
          button={<Input.Button tailIcon={<ArrowRightLineIcon />}>Отправить</Input.Button>}
        />
        <Input
          {...args}
          placeholder={'Input with icon action'}
          button={<Input.Button.Icon leadIcon={<FileCopyLineIcon />} />}
        />
      </div>
    );
  },
};
