import { Badge, iconName } from '@sellgar/kit';

import type { Meta, StoryObj } from '@storybook/react-vite';
import type { ComponentProps, ReactNode } from 'react';

import { iconMapping } from '../../../utils/iconMapping.tsx';

type TBadgeProps = ComponentProps<typeof Badge>;
type TBadgeDotProps = ComponentProps<typeof Badge.Dot>;
type TBadgeColor = NonNullable<TBadgeProps['color']>;
type TBadgeSize = NonNullable<TBadgeProps['size']>;
type TBadgeShape = NonNullable<TBadgeProps['shape']>;
type TBadgeState = NonNullable<TBadgeProps['state']>;
type TBadgeDotState = NonNullable<TBadgeDotProps['state']>;

const colorVariants: readonly TBadgeColor[] = [
  'gray',
  'blue',
  'green',
  'red',
  'orange',
  'purple',
  'white',
  'surface',
  'white-destructive',
  'surface-destructive',
  'white-info',
  'surface-info',
  'white-success',
  'surface-success',
  'brand',
];
const sizeVariants: readonly TBadgeSize[] = ['lg', 'md', 'sm', 'xs'];
const shapeVariants: readonly TBadgeShape[] = ['rounded', 'pill'];
const stateVariants: readonly TBadgeState[] = ['default', 'disabled', 'hover', 'on-click'];
const baseStateVariants: readonly TBadgeDotState[] = ['default', 'disabled'];
const redStateVariants: readonly TBadgeState[] = ['hover', 'on-click'];
const outlinedColorVariants: readonly TBadgeColor[] = ['blue', 'green', 'orange', 'red', 'purple', 'brand'];
const dotColorVariants: readonly NonNullable<TBadgeDotProps['dotColor']>[] = [
  'gray',
  'green',
  'blue',
  'orange',
  'red',
  'purple',
];

const meta: Meta<typeof Badge> = {
  title: 'Kit/Status/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    stroke: false,
    disabled: false,
    label: 'Badge',
    color: 'gray',
    size: 'md',
    shape: 'rounded',
    state: 'default',
    outlined: false,
    leadIcon: null,
    tailIcon: null,
  },
  argTypes: {
    color: {
      options: colorVariants,
      control: {
        type: 'select',
      },
    },
    shape: {
      options: shapeVariants,
      control: {
        type: 'radio',
      },
    },
    state: {
      options: stateVariants,
      control: {
        type: 'radio',
      },
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
      options: sizeVariants,
    },
    label: {
      control: 'text',
    },
    outlined: {
      control: 'boolean',
    },
  },
};

type Story = StoryObj<typeof meta>;
export default meta;

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

const renderRowTitle = (children: ReactNode) => (
  <div
    style={{
      color: 'var(--text-base-tertiary)',
      fontSize: 'var(--typography-size-caption-m)',
      lineHeight: 'var(--typography-line-height-caption-m)',
    }}
  >
    {children}
  </div>
);

const renderBadge = (props: TBadgeProps) => (
  <Badge
    {...props}
    leadIcon={props.leadIcon ? props.leadIcon : undefined}
    tailIcon={props.tailIcon ? props.tailIcon : undefined}
  />
);

const renderBadgeRow = (key: string, title: ReactNode, badges: readonly ReactNode[]) => (
  <div key={key} style={{ display: 'grid', gap: 'var(--numbers-6)' }}>
    {renderRowTitle(title)}

    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--numbers-8)' }}>{badges}</div>
  </div>
);

export const Default: Story = {
  args: {},
  render: renderBadge,
};

export const Dot: Story = {
  render() {
    return <Badge.Dot dotColor={'green'} label={'Badge'} size={'md'} />;
  },
};

export const Matrix: Story = {
  render() {
    return (
      <div style={{ display: 'grid', gap: 'var(--numbers-40)' }}>
        <div style={{ display: 'grid', gap: 'var(--numbers-12)' }}>
          {renderTitle('base: color x size x state x shape x stroke')}

          <div style={{ display: 'grid', gap: 'var(--numbers-16)' }}>
            {sizeVariants.flatMap((size) =>
              shapeVariants.flatMap((shape) =>
                [false, true].flatMap((stroke) =>
                  baseStateVariants.map((state) =>
                    renderBadgeRow(
                      `${size}-${shape}-${stroke}-${state}`,
                      `${size} / ${shape} / ${stroke ? 'stroke' : 'filled'} / ${state}`,
                      colorVariants.map((color) => (
                        <Badge
                          key={color}
                          color={color}
                          label={'Badge'}
                          shape={shape}
                          size={size}
                          state={state}
                          stroke={stroke}
                        />
                      )),
                    ),
                  ),
                ),
              ),
            )}
          </div>
        </div>

        <div style={{ display: 'grid', gap: 'var(--numbers-12)' }}>
          {renderTitle('outlined')}

          <div style={{ display: 'grid', gap: 'var(--numbers-16)' }}>
            {sizeVariants.flatMap((size) =>
              shapeVariants.flatMap((shape) =>
                baseStateVariants.map((state) =>
                  renderBadgeRow(
                    `${size}-${shape}-outlined-${state}`,
                    `${size} / ${shape} / outlined / ${state}`,
                    outlinedColorVariants.map((color) => (
                      <Badge
                        key={color}
                        color={color}
                        label={'Badge'}
                        leadIcon={iconMapping[iconName.informationLine]}
                        outlined
                        shape={shape}
                        size={size}
                        state={state}
                        tailIcon={iconMapping[iconName.closeLine]}
                      />
                    )),
                  ),
                ),
              ),
            )}
          </div>
        </div>

        <div style={{ display: 'grid', gap: 'var(--numbers-12)' }}>
          {renderTitle('red interaction states')}

          <div style={{ display: 'grid', gap: 'var(--numbers-16)' }}>
            {(['md', 'sm'] as const).map((size) =>
              renderBadgeRow(
                `${size}-red-interaction`,
                `${size} / rounded / red`,
                redStateVariants.map((state) => (
                  <Badge key={state} color={'red'} label={state} size={size} state={state} />
                )),
              ),
            )}
          </div>
        </div>

        <div style={{ display: 'grid', gap: 'var(--numbers-12)' }}>
          {renderTitle('with icons')}

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--numbers-12)' }}>
            <Badge
              color={'gray'}
              label={'Badge'}
              leadIcon={iconMapping[iconName.informationLine]}
              size={'md'}
              tailIcon={iconMapping[iconName.closeLine]}
            />
            <Badge
              color={'gray'}
              label={'Badge'}
              leadIcon={iconMapping[iconName.informationLine]}
              size={'sm'}
              tailIcon={iconMapping[iconName.closeLine]}
            />
          </div>
        </div>

        <div style={{ display: 'grid', gap: 'var(--numbers-12)' }}>
          {renderTitle('dot')}

          <div style={{ display: 'grid', gap: 'var(--numbers-16)' }}>
            {sizeVariants.flatMap((size) =>
              baseStateVariants.map((state) =>
                renderBadgeRow(
                  `${size}-dot-${state}`,
                  `${size} / surface-dots / ${state}`,
                  dotColorVariants.map((dotColor) => (
                    <Badge.Dot key={dotColor} dotColor={dotColor} label={'Badge'} size={size} state={state} />
                  )),
                ),
              ),
            )}
          </div>
        </div>
      </div>
    );
  },
};

export const DotMatrix: Story = {
  render() {
    return (
      <div style={{ display: 'grid', gap: 'var(--numbers-24)' }}>
        {sizeVariants.flatMap((size) =>
          baseStateVariants.map((state) =>
            renderBadgeRow(
              `${size}-${state}`,
              `dot size ${size} / ${state}`,
              dotColorVariants.map((dotColor) => (
                <Badge.Dot key={dotColor} dotColor={dotColor} label={'Badge'} size={size} state={state} />
              )),
            ),
          ),
        )}
      </div>
    );
  },
};
