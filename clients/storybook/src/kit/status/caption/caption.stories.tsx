import { Caption, iconName } from '@sellgar/kit';

import type { Meta, StoryObj } from '@storybook/react-vite';
import type { ComponentProps, ReactNode } from 'react';

import { iconMapping } from '../../../utils/iconMapping.tsx';

const meta: Meta<typeof Caption> = {
  title: 'Kit/Status/Caption',
  component: Caption,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    leadIcon: null,
    caption: 'Helper text',
    size: 'l',
    state: 'default',
  },
  argTypes: {
    size: {
      options: ['l', 'm'],
      control: 'radio',
    },
    state: {
      options: ['default', 'secondary', 'destructive', 'success', 'info'],
      control: 'select',
    },
    leadIcon: {
      control: {
        type: 'select',
        labels: {
          null: 'не использовать',
        },
      },
      options: [null, ...Object.values(iconName)],
      value: iconName.informationLine,
      mapping: iconMapping,
    },
  },
};

type Story = StoryObj<typeof meta>;
type TCaptionProps = ComponentProps<typeof Caption>;
type TCaptionSize = NonNullable<TCaptionProps['size']>;
type TCaptionState = NonNullable<TCaptionProps['state']>;

export default meta;

const sizeVariants: readonly TCaptionSize[] = ['l', 'm'];
const stateVariants: readonly TCaptionState[] = ['default', 'secondary', 'destructive', 'success', 'info'];

const renderTitle = (children: ReactNode) => (
  <div
    style={{
      color: 'var(--text-base-secondary)',
      fontSize: 'var(--typography-size-caption-l)',
      lineHeight: 'var(--typography-line-height-caption-l)',
    }}
  >
    {children}
  </div>
);

export const Default: Story = {
  args: {},
};

export const Matrix: Story = {
  render() {
    return (
      <div style={{ display: 'grid', gap: 'var(--numbers-24)' }}>
        {sizeVariants.map((size) => (
          <div key={size} style={{ display: 'grid', gap: 'var(--numbers-12)' }}>
            {renderTitle(`size ${size}`)}

            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 'var(--numbers-24)',
              }}
            >
              {stateVariants.map((state) => (
                <div key={state} style={{ display: 'grid', gap: 'var(--numbers-8)' }}>
                  <Caption
                    caption={'Helper text'}
                    leadIcon={iconMapping[iconName.informationLine]}
                    size={size}
                    state={state}
                  />
                  <Caption caption={'Helper text'} size={size} state={state} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  },
};
