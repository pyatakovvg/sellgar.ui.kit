import type { Meta, StoryObj } from '@storybook/react-vite';

import { Button, Badge, iconName } from '@sellgar/kit';

import { iconMapping } from '../../../utils/iconMapping.tsx';

const meta: Meta<typeof Button> = {
  title: 'Kit/Symbols/Button',
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
  },
};

type Story = StoryObj<typeof meta>;
export default meta;

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
