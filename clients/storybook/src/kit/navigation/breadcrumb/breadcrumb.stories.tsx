import { Breadcrumb } from '@sellgar/kit';
import { AsteriskIcon, FolderLineIcon } from '@sellgar/kit/icons';

import type { Meta, StoryObj } from '@storybook/react-vite';
import type { ComponentProps, ReactNode } from 'react';

type TBreadcrumbProps = ComponentProps<typeof Breadcrumb>;
type TBreadcrumbSize = NonNullable<TBreadcrumbProps['size']>;
type TBreadcrumbDivider = NonNullable<TBreadcrumbProps['divider']>;
type TBreadcrumbItem = TBreadcrumbProps['items'][number];

const sizeVariants: readonly TBreadcrumbSize[] = ['sm', 'md'];
const dividerVariants = ['arrow', 'slash'] as const satisfies readonly TBreadcrumbDivider[];

const defaultItems: readonly TBreadcrumbItem[] = [
  { href: '#catalog', label: 'Catalog', leadIcon: <FolderLineIcon /> },
  { href: '#products', label: 'Products', leadIcon: <FolderLineIcon /> },
  { href: '#cards', label: 'Cards', leadIcon: <FolderLineIcon /> },
  { label: 'Details', leadIcon: <FolderLineIcon /> },
];

const meta: Meta<typeof Breadcrumb> = {
  title: 'Kit/Navigation/Breadcrumb',
  component: Breadcrumb,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    divider: 'arrow',
    items: defaultItems,
    size: 'sm',
  },
  argTypes: {
    size: {
      options: sizeVariants,
      control: 'radio',
    },
    divider: {
      options: dividerVariants,
      control: 'radio',
    },
    items: {
      control: 'object',
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

const renderRow = (title: string, content: ReactNode) => (
  <div key={title} style={{ display: 'grid', gap: 'var(--numbers-8)' }}>
    <div
      style={{
        color: 'var(--text-base-tertiary)',
        fontSize: 'var(--typography-size-caption-m)',
        lineHeight: 'var(--typography-line-height-caption-m)',
      }}
    >
      {title}
    </div>
    {content}
  </div>
);

const renderTrail = (size: TBreadcrumbSize, divider: TBreadcrumbDivider, items: readonly TBreadcrumbItem[]) => (
  <Breadcrumb divider={divider} items={items} size={size} />
);

export const Default: Story = {
  render(args) {
    return <Breadcrumb {...args} />;
  },
};

export const Matrix: Story = {
  render() {
    return (
      <div style={{ display: 'grid', gap: 'var(--numbers-32)' }}>
        <div style={{ display: 'grid', gap: 'var(--numbers-12)' }}>
          {renderSectionTitle('item content')}

          {sizeVariants.flatMap((size) => [
            renderRow(`${size} / text`, <Breadcrumb items={[{ label: 'Label' }]} size={size} />),
            renderRow(
              `${size} / link`,
              <Breadcrumb items={[{ href: '#label', label: 'Label' }, { label: 'Current' }]} size={size} />,
            ),
            renderRow(
              `${size} / lead icon`,
              <Breadcrumb items={[{ label: 'Label', leadIcon: <FolderLineIcon /> }]} size={size} />,
            ),
            renderRow(
              `${size} / lead and tail icon`,
              <Breadcrumb
                items={[{ label: 'Label', leadIcon: <FolderLineIcon />, tailIcon: <AsteriskIcon /> }]}
                size={size}
              />,
            ),
            renderRow(`${size} / more`, <Breadcrumb items={[{ label: '...', variant: 'more' }]} size={size} />),
          ])}
        </div>

        <div style={{ display: 'grid', gap: 'var(--numbers-12)' }}>
          {renderSectionTitle('trail')}

          {sizeVariants.flatMap((size) =>
            dividerVariants.map((divider) =>
              renderRow(`${size} / ${divider}`, renderTrail(size, divider, defaultItems)),
            ),
          )}
        </div>

        <div style={{ display: 'grid', gap: 'var(--numbers-12)' }}>
          {renderSectionTitle('overflow')}

          {sizeVariants.flatMap((size) =>
            dividerVariants.map((divider) =>
              renderRow(
                `${size} / ${divider}`,
                renderTrail(size, divider, [
                  { href: '#catalog', label: 'Catalog', leadIcon: <FolderLineIcon /> },
                  { href: '#more', label: '...', variant: 'more' },
                  { label: 'Details', leadIcon: <FolderLineIcon /> },
                ]),
              ),
            ),
          )}
        </div>
      </div>
    );
  },
};
