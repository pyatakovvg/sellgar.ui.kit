import type { Meta, StoryObj } from '@storybook/react-vite';

import { Button, iconName } from '@sellgar/kit';

import { iconMapping } from '../../../../utils/iconMapping.tsx';

const meta: Meta<typeof Button.Icon> = {
  title: 'Kit/Action/Button/Icon',
  component: Button.Icon,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  args: {
    shape: 'rounded',
    style: 'primary',
    size: 'lg',
    disabled: false,
    target: 'default',
    leadIcon: iconName.clockwise2Fill,
    inProcess: false,
  },
  argTypes: {
    shape: {
      options: ['rounded', 'pill'],
      control: {
        type: 'radio',
      },
      table: {
        default: false,
      },
    },
    target: {
      options: ['default', 'destructive', 'success', 'info'],
      control: 'select',
      type: 'string',
    },
    leadIcon: {
      control: {
        type: 'select',
        labels: {
          null: 'не использовать',
        },
      },
      options: [null, ...Object.values(iconName)],
      value: iconName.copyleftLine,
      mapping: iconMapping,
    },
    style: {
      options: ['primary', 'secondary', 'tertiary', 'ghost'],
      control: 'select',
    },
    size: {
      control: {
        type: 'radio',
        labels: {
          lg: 'large',
          md: 'middle',
          sm: 'small',
          xs: 'extra-small',
        },
      },
      options: ['lg', 'md', 'sm', 'xs'],
    },
    inProcess: {
      control: {
        type: 'boolean',
      },
    },
  },
};

type Story = StoryObj<typeof meta>;
export default meta;

const styleVariants = ['primary', 'secondary', 'tertiary', 'ghost'] as const;
const targetVariants = ['default', 'destructive', 'success', 'info'] as const;
const stateVariants = [
  { title: 'normal', props: {} },
  { title: 'disabled', props: { disabled: true } },
  { title: 'inProcess', props: { inProcess: true } },
] as const;

export const Default: Story = {
  render(args: any) {
    return (
      <div style={{ textAlign: 'center' }}>
        <div>
          <Button.Icon {...args} leadIcon={args.leadIcon ? args.leadIcon : undefined} />
        </div>
      </div>
    );
  },
};

export const Matrix: Story = {
  render() {
    return (
      <div style={{ display: 'grid', gap: 24 }}>
        {stateVariants.map((state) => (
          <div key={state.title} style={{ display: 'grid', gap: 12 }}>
            <div style={{ fontSize: 14, fontWeight: 600 }}>{state.title}</div>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, minmax(96px, 1fr))',
                gap: 12,
              }}
            >
              {targetVariants.map((target) => (
                <div key={target} style={{ display: 'grid', gap: 8 }}>
                  <div style={{ fontSize: 12, color: 'var(--text-base-secondary)' }}>{target}</div>
                  {styleVariants.map((style) => (
                    <Button.Icon
                      key={style}
                      size={'sm'}
                      style={style}
                      target={target}
                      leadIcon={iconMapping[iconName.clockwise2Fill]}
                      {...state.props}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  },
};
