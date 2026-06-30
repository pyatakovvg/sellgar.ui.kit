import type { Meta, StoryObj } from '@storybook/react-vite';

import { Button, Badge, iconName } from '@sellgar/kit';

import { iconMapping } from '../../../utils/iconMapping.tsx';

const meta: Meta<typeof Button> = {
  title: 'Kit/Action/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  args: {
    shape: 'rounded',
    style: 'primary',
    children: 'Button',
    size: 'lg',
    disabled: false,
    target: 'default',
    leadIcon: null,
    tailIcon: null,
    badge: false,
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
    tailIcon: {
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
    badge: {
      control: {
        type: 'boolean',
      },
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
          <Button
            {...args}
            leadIcon={args.leadIcon ? args.leadIcon : undefined}
            tailIcon={args.tailIcon ? args.tailIcon : undefined}
            badge={args.badge && <Badge label={'12'} />}
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', width: 300, marginTop: 16 }}>
          <Button
            {...args}
            leadIcon={args.leadIcon ? args.leadIcon : undefined}
            tailIcon={args.tailIcon ? args.tailIcon : undefined}
            badge={args.badge && <Badge label={'12'} />}
          />
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
                gridTemplateColumns: 'repeat(4, minmax(160px, 1fr))',
                gap: 12,
              }}
            >
              {targetVariants.map((target) => (
                <div key={target} style={{ display: 'grid', gap: 8 }}>
                  <div style={{ fontSize: 12, color: 'var(--text-base-secondary)' }}>{target}</div>
                  {styleVariants.map((style) => (
                    <Button
                      key={style}
                      size={'sm'}
                      style={style}
                      target={target}
                      leadIcon={iconMapping[iconName.copyleftLine]}
                      tailIcon={iconMapping[iconName.copyleftLine]}
                      badge={<Badge label={'12'} />}
                      {...state.props}
                    >
                      {style}
                    </Button>
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
