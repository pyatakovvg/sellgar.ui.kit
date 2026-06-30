import type { Meta, StoryObj } from '@storybook/react-vite';

import { Icon, iconName } from '@sellgar/kit';

const showcaseIcons = [
  iconName.homeLine,
  iconName.searchLine,
  iconName.notificationLine,
  iconName.settings3Line,
  iconName.userLine,
  iconName.arrowRightLine,
  iconName.checkLine,
  iconName.closeLine,
  iconName.addLine,
  iconName.deleteBinLine,
  iconName.editLine,
  iconName.downloadLine,
] as const;

const meta: Meta<typeof Icon> = {
  title: 'Kit/Content/Icon',
  component: Icon,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  args: {
    icon: iconName.ancientGateFill,
  },
  argTypes: {
    icon: {
      options: Object.values(iconName),
      control: 'select',
    },
    className: {
      control: false,
    },
  },
};

type Story = StoryObj<typeof meta>;

export default meta;

export const Default: Story = {
  render(args) {
    return (
      <div
        style={{
          color: 'var(--icon-base-primary)',
          fontSize: 32,
          lineHeight: 1,
        }}
      >
        <Icon {...args} />
      </div>
    );
  },
};

export const Showcase: Story = {
  render() {
    return (
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, minmax(120px, 1fr))',
          gap: 12,
          maxWidth: 640,
        }}
      >
        {showcaseIcons.map((icon) => (
          <div
            key={icon}
            style={{
              display: 'grid',
              gap: 8,
              justifyItems: 'center',
              alignItems: 'center',
              minHeight: 96,
              padding: 16,
              border: '1px solid var(--border-base-alpha)',
              borderRadius: 'var(--measurements-radius-md)',
              color: 'var(--icon-base-secondary)',
            }}
          >
            <span style={{ fontSize: 24, lineHeight: 1 }}>
              <Icon icon={icon} />
            </span>
            <span
              style={{
                color: 'var(--text-base-tertiary)',
                fontSize: 'var(--typography-size-caption-m)',
                lineHeight: 'var(--typography-line-height-caption-m)',
                textAlign: 'center',
              }}
            >
              {icon}
            </span>
          </div>
        ))}
      </div>
    );
  },
};
