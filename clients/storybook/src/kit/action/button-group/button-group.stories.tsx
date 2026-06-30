import { ButtonGroup, Badge } from '@sellgar/kit';
import { HailFillIcon, PhoneCameraFillIcon, RadarFillIcon, ScanLineIcon } from '@sellgar/kit/icons';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof ButtonGroup> = {
  title: 'Kit/Action/ButtonGroup',
  component: ButtonGroup,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  args: {
    shape: 'rounded',
    size: 'lg',
    disabled: false,
    fill: 'contain',
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

    size: {
      control: {
        type: 'radio',
        labels: {
          lg: 'large',
          md: 'middle',
          sm: 'small',
        },
      },
      options: ['lg', 'md', 'sm'],
    },
    fill: {
      control: {
        type: 'radio',
        labels: {
          auto: 'auto',
          contain: 'contain',
        },
      },
      options: ['auto', 'contain'],
    },
  },
};

type Story = StoryObj<typeof meta>;
export default meta;

const sizeVariants = ['lg', 'md', 'sm'] as const;
const shapeVariants = ['rounded', 'pill'] as const;
const fillVariants = ['auto', 'contain'] as const;
const stateVariants = [
  { title: 'normal', props: {} },
  { title: 'disabled', props: { disabled: true } },
] as const;

const iconOnlyItems = [
  <ButtonGroup.Icon key={'scan'} aria-label={'Scan'} leadIcon={<ScanLineIcon />} />,
  <ButtonGroup.Icon key={'camera'} aria-label={'Camera'} leadIcon={<PhoneCameraFillIcon />} />,
  <ButtonGroup.Icon key={'hail'} aria-label={'Hail'} leadIcon={<HailFillIcon />} />,
  <ButtonGroup.Icon key={'radar'} aria-label={'Radar'} leadIcon={<RadarFillIcon />} />,
];

const textItems = [
  <ButtonGroup.Button key={'one'} leadIcon={<ScanLineIcon />} badge={<Badge label={'16'} />}>
    Button
  </ButtonGroup.Button>,
  <ButtonGroup.Button key={'two'} leadIcon={<PhoneCameraFillIcon />} badge={<Badge label={'16'} />}>
    Button
  </ButtonGroup.Button>,
  <ButtonGroup.Button key={'three'} leadIcon={<RadarFillIcon />} badge={<Badge label={'16'} />}>
    Button
  </ButtonGroup.Button>,
];

const mixedItems = [
  <ButtonGroup.Button key={'one'} leadIcon={<ScanLineIcon />} badge={<Badge label={'16'} />}>
    Button
  </ButtonGroup.Button>,
  <ButtonGroup.Button key={'two'} leadIcon={<PhoneCameraFillIcon />} badge={<Badge label={'16'} />}>
    Button
  </ButtonGroup.Button>,
  <ButtonGroup.Icon key={'action'} aria-label={'Radar'} leadIcon={<RadarFillIcon />} />,
];

export const Default: Story = {
  render(args) {
    return (
      <div
        style={{
          display: 'grid',
          gap: 'var(--numbers-32)',
          justifyItems: 'center',
          minWidth: 'var(--numbers-448)',
        }}
      >
        <ButtonGroup shape={args.shape} size={args.size} disabled={args.disabled} fill={args.fill}>
          {textItems}
        </ButtonGroup>

        <ButtonGroup shape={args.shape} size={args.size} disabled={args.disabled}>
          {iconOnlyItems}
        </ButtonGroup>
      </div>
    );
  },
};

export const Mixed: Story = {
  args: {
    fill: 'auto',
  },
  render(args) {
    return (
      <ButtonGroup shape={args.shape} size={args.size} disabled={args.disabled} fill={args.fill}>
        {mixedItems}
      </ButtonGroup>
    );
  },
};

export const DesignUsage: Story = {
  render(args) {
    const variants = [
      { shape: 'rounded' as const, fill: 'auto' as const },
      { shape: 'pill' as const, fill: 'auto' as const },
      { shape: 'rounded' as const, fill: 'contain' as const },
      { shape: 'pill' as const, fill: 'contain' as const },
    ];

    return (
      <div style={{ display: 'grid', gap: 'var(--numbers-32)', width: 'var(--numbers-448)' }}>
        {variants.map((variant) => (
          <ButtonGroup
            key={`${variant.shape}-${variant.fill}`}
            disabled={args.disabled}
            fill={variant.fill}
            shape={variant.shape}
            size={args.size}
          >
            {textItems}
          </ButtonGroup>
        ))}
      </div>
    );
  },
};

export const Matrix: Story = {
  render() {
    return (
      <div style={{ display: 'grid', gap: 'var(--numbers-32)' }}>
        {stateVariants.map((state) => (
          <div key={state.title} style={{ display: 'grid', gap: 'var(--numbers-12)' }}>
            <div style={{ fontSize: 'var(--numbers-14)', fontWeight: 600 }}>{state.title}</div>

            <div
              style={{
                display: 'grid',
                gap: 'var(--numbers-16)',
                gridTemplateColumns: 'repeat(2, minmax(var(--numbers-360), 1fr))',
              }}
            >
              {shapeVariants.map((shape) => (
                <div key={shape} style={{ display: 'grid', gap: 'var(--numbers-12)' }}>
                  <div style={{ color: 'var(--text-base-secondary)', fontSize: 'var(--numbers-12)' }}>{shape}</div>

                  {fillVariants.map((fill) => (
                    <div key={fill} style={{ display: 'grid', gap: 'var(--numbers-8)' }}>
                      <div style={{ color: 'var(--text-base-secondary)', fontSize: 'var(--numbers-12)' }}>{fill}</div>

                      {sizeVariants.map((size) => (
                        <ButtonGroup key={size} fill={fill} shape={shape} size={size} {...state.props}>
                          {textItems}
                        </ButtonGroup>
                      ))}
                    </div>
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

export const MixedMatrix: Story = {
  render() {
    return (
      <div style={{ display: 'grid', gap: 'var(--numbers-24)' }}>
        {shapeVariants.map((shape) => (
          <div key={shape} style={{ display: 'grid', gap: 'var(--numbers-12)' }}>
            <div style={{ color: 'var(--text-base-secondary)', fontSize: 'var(--numbers-12)' }}>{shape}</div>

            {sizeVariants.map((size) => (
              <ButtonGroup key={size} fill={'auto'} shape={shape} size={size}>
                {mixedItems}
              </ButtonGroup>
            ))}
          </div>
        ))}
      </div>
    );
  },
};

export const KeyboardFocus: Story = {
  parameters: {
    pseudo: {
      focusVisible: true,
    },
  },
  render() {
    return (
      <div style={{ display: 'grid', gap: 'var(--numbers-32)', justifyItems: 'center' }}>
        <ButtonGroup fill={'auto'} shape={'rounded'} size={'lg'}>
          {mixedItems}
        </ButtonGroup>

        <ButtonGroup fill={'auto'} shape={'pill'} size={'lg'}>
          {iconOnlyItems}
        </ButtonGroup>
      </div>
    );
  },
};
