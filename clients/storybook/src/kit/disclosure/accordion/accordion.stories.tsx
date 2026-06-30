import { Accordion, Checkbox, Label, ToolTip, Typography } from '@sellgar/kit';
import { User3LineIcon } from '@sellgar/kit/icons';

import type { Meta, StoryObj } from '@storybook/react-vite';
import type { ReactNode } from 'react';

const meta: Meta<typeof Accordion> = {
  title: 'Kit/Disclosure/Accordion',
  component: Accordion,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    label: <Label label={'Headline text'} caption={'(optional)'} required />,
    description: (
      <Typography size={'caption-l'} weight={'regular'}>
        <p>Helper text</p>
      </Typography>
    ),
    defaultState: false,
    radius: 'lg',
    size: 'lg',
  },
  argTypes: {
    size: {
      options: ['lg', 'md'],
      control: 'radio',
    },
    radius: {
      options: ['lg', 'xxl'],
      control: 'radio',
    },
    expanded: {
      control: 'boolean',
    },
  },
};

type Story = StoryObj<typeof meta>;
export default meta;

const sizeVariants = ['lg', 'md'] as const;
const radiusVariants = ['lg', 'xxl'] as const;
const stateVariants = [
  { title: 'Collapsed', expanded: false },
  { title: 'Expanded', expanded: true },
] as const;

const iconSlot = (
  <User3LineIcon
    style={{
      flex: '0 0 auto',
      width: 'var(--numbers-20)',
      height: 'var(--numbers-20)',
    }}
  />
);

const label = (
  <div style={{ display: 'inline-flex', alignItems: 'center', gap: 'var(--numbers-4)' }}>
    <Label label={'Headline text'} caption={'(optional)'} required />
    <ToolTip>
      <ToolTip.Trigger />
      <ToolTip.Content>Tooltip content</ToolTip.Content>
    </ToolTip>
  </div>
);

const description = (
  <Typography size={'caption-l'} weight={'regular'}>
    <p>Helper text</p>
  </Typography>
);

const leadSlotVariants = [
  { title: 'Icon slot', leadSlot1: iconSlot },
  { title: 'Control slot', leadSlot1: <Checkbox checked={false} readOnly tabIndex={-1} /> },
  {
    title: 'Control + icon slot',
    leadSlot1: <Checkbox checked={false} readOnly tabIndex={-1} />,
    leadSlot2: iconSlot,
  },
] as const;

const slot = (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      flex: '1 0 auto',
      height: 'var(--numbers-280)',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 'var(--measurements-radius-xl)',
      border: 'var(--numbers-1) dashed var(--border-action-focus)',
      background: 'var(--background-badge-purple)',
      color: 'var(--text-accent-purple)',
      boxShadow: '0 var(--numbers-1) var(--numbers-2) 0 rgba(20, 21, 26, 0.05)',
    }}
  >
    <span
      style={{
        fontSize: 'var(--typography-size-h6)',
        fontWeight: 'var(--typography-weight-medium)',
        lineHeight: 'var(--typography-line-height-h6)',
        letterSpacing: 'var(--typography-letter-spacing-h6)',
      }}
    >
      Slot
    </span>
  </div>
);

const renderAccordion = (props: {
  defaultState?: boolean;
  expanded?: boolean;
  leadSlot1?: ReactNode;
  leadSlot2?: ReactNode;
  radius?: 'lg' | 'xxl';
  size?: 'lg' | 'md';
}) => (
  <Accordion
    {...props}
    label={label}
    description={description}
  >
    {slot}
  </Accordion>
);

export const Default: Story = {
  render(args) {
    return (
      <div style={{ width: 'var(--numbers-400)' }}>
        <Accordion {...args} leadSlot1={iconSlot}>
          {slot}
        </Accordion>
      </div>
    );
  },
};

export const Matrix: Story = {
  render() {
    return (
      <div style={{ display: 'grid', gap: 'var(--numbers-32)' }}>
        {leadSlotVariants.map((leadSlotVariant) => (
          <div key={leadSlotVariant.title} style={{ display: 'grid', gap: 'var(--numbers-16)' }}>
            <div style={{ color: 'var(--text-base-secondary)', fontSize: 'var(--typography-size-caption-l)' }}>
              {leadSlotVariant.title}
            </div>

            {stateVariants.map((stateVariant) => (
              <div key={stateVariant.title} style={{ display: 'grid', gap: 'var(--numbers-12)' }}>
                <div style={{ color: 'var(--text-base-secondary)', fontSize: 'var(--typography-size-caption-l)' }}>
                  {stateVariant.title}
                </div>

                <div
                  style={{
                    display: 'grid',
                    gap: 'var(--numbers-16)',
                    gridTemplateColumns: 'repeat(2, var(--numbers-400))',
                  }}
                >
                  {radiusVariants.map((radius) => (
                    <div key={radius} style={{ display: 'grid', gap: 'var(--numbers-12)' }}>
                      <div style={{ color: 'var(--text-base-secondary)', fontSize: 'var(--typography-size-caption-l)' }}>
                        radius {radius}
                      </div>

                      {sizeVariants.map((size) => (
                        <div key={size}>
                          {renderAccordion({
                            expanded: stateVariant.expanded,
                            leadSlot1: leadSlotVariant.leadSlot1,
                            leadSlot2: leadSlotVariant.leadSlot2,
                            radius,
                            size,
                          })}
                        </div>
                      ))}
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

export const KeyboardFocus: Story = {
  parameters: {
    pseudo: {
      focusVisible: true,
    },
  },
  render() {
    return (
      <div style={{ display: 'grid', gap: 'var(--numbers-16)', width: 'var(--numbers-400)' }}>
        {renderAccordion({ leadSlot1: iconSlot })}
        {renderAccordion({ leadSlot1: <Checkbox checked={false} readOnly tabIndex={-1} />, radius: 'xxl' })}
      </div>
    );
  },
};
