import { Avatar, Chip, Typography } from '@sellgar/kit';
import { CloseLineIcon, FileLineIcon, Filter3LineIcon } from '@sellgar/kit/icons';

import type { Meta, StoryObj } from '@storybook/react-vite';
import type { ComponentProps, ReactNode } from 'react';

type TChipProps = ComponentProps<typeof Chip>;
type TChipSize = NonNullable<TChipProps['size']>;
type TChipShape = NonNullable<TChipProps['shape']>;
type TChipLeadContent = 'default' | 'file icon' | 'avatar';
type TChipMatrixVariant = {
  readonly title: string;
  readonly props: Pick<TChipProps, 'disabled' | 'isSelected' | 'isStatic' | 'tailIcon'>;
};

const sizeVariants: readonly TChipSize[] = ['xl', 'lg', 'md', 'sm'];
const shapeVariants: readonly TChipShape[] = ['rounded', 'pill'];
const leadContentVariants: readonly TChipLeadContent[] = ['default', 'file icon', 'avatar'];

const meta: Meta<typeof Chip> = {
  title: 'Kit/Content/Chip',
  component: Chip,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    disabled: false,
    isStatic: false,
    isSelected: false,
    label: 'Label',
    shape: 'rounded',
    size: 'lg',
  },
  argTypes: {
    size: {
      options: sizeVariants,
      control: 'radio',
    },
    shape: {
      options: shapeVariants,
      control: 'radio',
    },
    isSelected: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
    isStatic: {
      control: 'boolean',
    },
    label: {
      control: 'text',
    },
    leadIcon: {
      table: {
        disable: true,
      },
    },
    tailIcon: {
      table: {
        disable: true,
      },
    },
  },
};

type Story = StoryObj<typeof meta>;
export default meta;

const renderSectionTitle = (title: string) => (
  <div
    style={{
      color: 'var(--text-base-secondary)',
      fontSize: 'var(--typography-size-caption-l)',
      fontWeight: 'var(--typography-weight-semi-bold)',
      lineHeight: 'var(--typography-line-height-caption-l)',
    }}
  >
    {title}
  </div>
);

const renderRowTitle = (title: string) => (
  <div
    style={{
      color: 'var(--text-base-tertiary)',
      fontSize: 'var(--typography-size-caption-m)',
      lineHeight: 'var(--typography-line-height-caption-m)',
    }}
  >
    {title}
  </div>
);

const renderAvatar = () => (
  <Avatar color={'blue'} size={'xs'} theme={'accent'}>
    <Typography size={'caption-m'} weight={'medium'}>
      <p style={{ margin: 0 }}>B</p>
    </Typography>
  </Avatar>
);

const renderLeadIcon = (content: TChipLeadContent): ReactNode => {
  switch (content) {
    case 'default':
      return <Filter3LineIcon />;
    case 'file icon':
      return <FileLineIcon />;
    case 'avatar':
      return renderAvatar();
  }
};

const renderChip = (props: TChipProps, leadContent: TChipLeadContent = 'default') => (
  <Chip {...props} leadIcon={renderLeadIcon(leadContent)} />
);

const getMatrixLabel = (label: TChipProps['label']) => {
  if (typeof label === 'string' || typeof label === 'number') {
    return label;
  }

  return 'Label';
};

const renderChipRow = (key: string, title: string, chips: readonly ReactNode[]) => (
  <div key={key} style={{ display: 'grid', gap: 'var(--numbers-8)' }}>
    {renderRowTitle(title)}

    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 'var(--numbers-8)',
      }}
    >
      {chips}
    </div>
  </div>
);

const matrixVariants: readonly TChipMatrixVariant[] = [
  {
    title: 'default',
    props: {},
  },
  {
    title: 'selected',
    props: {
      isSelected: true,
      tailIcon: <CloseLineIcon />,
    },
  },
  {
    title: 'disabled',
    props: {
      disabled: true,
    },
  },
  {
    title: 'static',
    props: {
      isStatic: true,
    },
  },
];

export const Default: Story = {
  render(args) {
    return renderChip(args);
  },
};

export const Selected: Story = {
  args: {
    isSelected: true,
    tailIcon: <CloseLineIcon />,
  },
  render(args) {
    return renderChip(args);
  },
};

export const Types: Story = {
  render(args) {
    return (
      <div style={{ display: 'grid', gap: 'var(--numbers-16)' }}>
        {renderSectionTitle('Types')}

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--numbers-12)' }}>
          {leadContentVariants.map((leadContent) => (
            <Chip key={leadContent} {...args} leadIcon={renderLeadIcon(leadContent)} />
          ))}
        </div>
      </div>
    );
  },
};

export const Matrix: Story = {
  render(args) {
    const label = getMatrixLabel(args.label);

    return (
      <div style={{ display: 'grid', gap: 'var(--numbers-32)' }}>
        <div style={{ display: 'grid', gap: 'var(--numbers-12)' }}>
          {renderSectionTitle('size x shape')}

          <div style={{ display: 'grid', gap: 'var(--numbers-16)' }}>
            {sizeVariants.flatMap((size) =>
              shapeVariants.map((shape) =>
                renderChipRow(
                  `${size}-${shape}`,
                  `${size} / ${shape}`,
                  leadContentVariants.map((leadContent) => (
                    <Chip
                      key={leadContent}
                      label={label}
                      leadIcon={renderLeadIcon(leadContent)}
                      isSelected={false}
                      shape={shape}
                      size={size}
                    />
                  )),
                ),
              ),
            )}
          </div>
        </div>

        <div style={{ display: 'grid', gap: 'var(--numbers-12)' }}>
          {renderSectionTitle('variants')}

          <div style={{ display: 'grid', gap: 'var(--numbers-16)' }}>
            {matrixVariants.map((variant) =>
              renderChipRow(
                variant.title,
                variant.title,
                shapeVariants.map((shape) => (
                  <Chip
                    key={shape}
                    label={label}
                    leadIcon={<Filter3LineIcon />}
                    shape={shape}
                    size={'lg'}
                    {...variant.props}
                  />
                )),
              ),
            )}
          </div>
        </div>
      </div>
    );
  },
};
