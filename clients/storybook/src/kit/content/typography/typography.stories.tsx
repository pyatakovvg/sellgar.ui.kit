import type { Meta, StoryObj } from '@storybook/react-vite';

import { Typography } from '@sellgar/kit';

const sizeVariants = [
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'body-l',
  'body-m',
  'body-s',
  'caption-l',
  'caption-m',
  'caption-s',
] as const;

const weightVariants = ['light', 'regular', 'medium', 'semi-bold', 'bold', 'extra-bold', 'black'] as const;

const specimen = 'Съешь же ещё этих мягких французских булок';

const meta: Meta<typeof Typography> = {
  title: 'Kit/Content/Typography',
  component: Typography,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
  args: {
    size: 'body-s',
    weight: 'medium',
    children: <p>{specimen}</p>,
  },
  argTypes: {
    size: {
      options: sizeVariants,
      control: 'select',
    },
    weight: {
      options: weightVariants,
      control: 'select',
    },
    children: {
      control: false,
    },
  },
};

type Story = StoryObj<typeof meta>;

export default meta;

export const Default: Story = {};

export const Scale: Story = {
  render(args) {
    return (
      <div style={{ display: 'grid', gap: 20, maxWidth: 960 }}>
        {sizeVariants.map((size) => (
          <div
            key={size}
            style={{
              display: 'grid',
              gridTemplateColumns: '96px minmax(0, 1fr)',
              gap: 24,
              alignItems: 'baseline',
            }}
          >
            <span
              style={{
                color: 'var(--text-base-tertiary)',
                fontSize: 'var(--typography-size-caption-l)',
                lineHeight: 'var(--typography-line-height-caption-l)',
              }}
            >
              {size}
            </span>
            <Typography {...args} size={size}>
              <p>{specimen}</p>
            </Typography>
          </div>
        ))}
      </div>
    );
  },
};

export const Weights: Story = {
  args: {
    size: 'body-s',
  },
  render(args) {
    return (
      <div style={{ display: 'grid', gap: 16, maxWidth: 960 }}>
        {weightVariants.map((weight) => (
          <div
            key={weight}
            style={{
              display: 'grid',
              gridTemplateColumns: '128px minmax(0, 1fr)',
              gap: 24,
              alignItems: 'baseline',
            }}
          >
            <span
              style={{
                color: 'var(--text-base-tertiary)',
                fontSize: 'var(--typography-size-caption-l)',
                lineHeight: 'var(--typography-line-height-caption-l)',
              }}
            >
              {weight}
            </span>
            <Typography {...args} weight={weight}>
              <p>{specimen}</p>
            </Typography>
          </div>
        ))}
      </div>
    );
  },
};
