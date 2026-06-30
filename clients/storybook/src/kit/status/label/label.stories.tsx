import { Label } from '@sellgar/kit';
import { InformationLineIcon } from '@sellgar/kit/icons';

import type { Meta, StoryObj } from '@storybook/react-vite';
import type { ComponentProps, ReactNode } from 'react';

const tailIcon = <InformationLineIcon />;

const meta: Meta<typeof Label> = {
  title: 'Kit/Status/Label',
  component: Label,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    label: 'Label',
    caption: '(optional)',
    required: false,
    size: 'l',
    state: 'default',
    textAlign: 'left',
  },
  argTypes: {
    size: {
      options: ['l', 'xl'],
      control: 'radio',
    },
    state: {
      options: ['default', 'secondary', 'disabled'],
      control: 'radio',
    },
    tailIcon: {
      control: false,
    },
    textAlign: {
      options: ['left', 'center'],
      control: 'radio',
    },
    required: {
      control: 'boolean',
    },
  },
};

type Story = StoryObj<typeof meta>;
type TLabelProps = ComponentProps<typeof Label>;
type TLabelSize = NonNullable<TLabelProps['size']>;
type TLabelState = NonNullable<TLabelProps['state']>;
type TLabelTextAlign = NonNullable<TLabelProps['textAlign']>;

export default meta;

const sizeVariants: readonly TLabelSize[] = ['l', 'xl'];
const stateVariants: readonly TLabelState[] = ['default', 'secondary', 'disabled'];
const textAlignVariants: readonly TLabelTextAlign[] = ['left', 'center'];

const renderColumnTitle = (children: ReactNode) => (
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

const renderLabel = (props: TLabelProps) => (
  <div
    style={{
      display: 'flex',
      width: 'var(--numbers-240)',
    }}
  >
    <Label {...props} />
  </div>
);

export const Default: Story = {
  args: {},
};

export const WithTailIcon: Story = {
  args: {
    required: true,
    tailIcon,
  },
};

export const Matrix: Story = {
  render() {
    return (
      <div style={{ display: 'grid', gap: 'var(--numbers-32)' }}>
        {sizeVariants.map((size) => (
          <div key={size} style={{ display: 'grid', gap: 'var(--numbers-16)' }}>
            {renderColumnTitle(`size ${size}`)}

            {stateVariants.map((state) => (
              <div key={state} style={{ display: 'grid', gap: 'var(--numbers-12)' }}>
                {renderColumnTitle(`state ${state}`)}

                <div
                  style={{
                    display: 'grid',
                    gap: 'var(--numbers-16)',
                    gridTemplateColumns: 'repeat(2, var(--numbers-240))',
                  }}
                >
                  {textAlignVariants.map((textAlign) => (
                    <div key={textAlign} style={{ display: 'grid', gap: 'var(--numbers-8)' }}>
                      {renderColumnTitle(textAlign)}

                      {renderLabel({
                        label: 'Label',
                        caption: '(optional)',
                        required: true,
                        size,
                        state,
                        tailIcon,
                        textAlign,
                      })}

                      {renderLabel({
                        label: 'Label',
                        size,
                        state,
                        textAlign,
                      })}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  },
};
