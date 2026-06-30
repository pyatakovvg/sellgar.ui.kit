import { Avatar, Image, Typography } from '@sellgar/kit';
import { User3LineIcon } from '@sellgar/kit/icons';

import type { Meta, StoryObj } from '@storybook/react-vite';
import type { ComponentProps } from 'react';

type TAvatarProps = ComponentProps<typeof Avatar>;
type TAvatarSize = NonNullable<TAvatarProps['size']>;
type TAvatarColor = NonNullable<TAvatarProps['color']>;
type TAvatarTheme = Exclude<NonNullable<TAvatarProps['theme']>, 'subtitle'>;
type TTypographySize = ComponentProps<typeof Typography>['size'];
type TAvatarContent = 'userpic' | 'empty' | 'initials' | 'icon';

const userpicSource = `data:image/svg+xml,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 160">
  <defs>
    <linearGradient id="background" x1="0" x2="1" y1="0" y2="1">
      <stop offset="0" stop-color="#b8cdfd"/>
      <stop offset="0.45" stop-color="#e3eafd"/>
      <stop offset="1" stop-color="#f8f9fb"/>
    </linearGradient>
    <linearGradient id="body" x1="0" x2="1" y1="0" y2="1">
      <stop offset="0" stop-color="#4778f5"/>
      <stop offset="1" stop-color="#133a9a"/>
    </linearGradient>
    <filter id="soft" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="8" stdDeviation="8" flood-color="#133a9a" flood-opacity="0.18"/>
    </filter>
  </defs>
  <rect width="160" height="160" fill="url(#background)"/>
  <circle cx="118" cy="34" r="38" fill="#ffffff" opacity="0.35"/>
  <circle cx="42" cy="126" r="52" fill="#4778f5" opacity="0.16"/>
  <g filter="url(#soft)">
    <path d="M31 160c9-43 27-65 49-65s40 22 49 65z" fill="url(#body)"/>
    <circle cx="80" cy="60" r="31" fill="#f4d1b8"/>
    <path d="M48 62c1-31 20-45 37-42 24 4 34 21 28 51-10-10-23-13-38-10-10 2-19 2-27 1z" fill="#273142"/>
    <path d="M57 76c9 13 36 13 46 0 1 21-9 34-23 34s-24-13-23-34z" fill="#f4d1b8"/>
  </g>
</svg>
`)}`;

const avatarSizes: readonly TAvatarSize[] = ['2xl', 'xl', 'lg', 'md', 'sm', 'xs'];
const avatarColors: readonly TAvatarColor[] = ['gray', 'blue', 'green', 'orange', 'red', 'purple', 'brand'];
const avatarThemes: readonly TAvatarTheme[] = ['subtle', 'accent'];
const avatarContentVariants: readonly TAvatarContent[] = ['userpic', 'empty', 'initials', 'icon'];
const avatarTextSizeByAvatarSize: Record<TAvatarSize, TTypographySize> = {
  '2xl': 'body-l',
  xl: 'body-l',
  lg: 'body-m',
  md: 'body-s',
  sm: 'caption-l',
  xs: 'caption-m',
};

const meta: Meta<typeof Avatar> = {
  title: 'Kit/Media/Avatar',
  component: Avatar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    size: '2xl',
    color: 'gray',
    isStatus: true,
    isNotification: true,
    theme: 'accent',
  },
  argTypes: {
    size: {
      options: avatarSizes,
      control: 'select',
    },
    color: {
      options: avatarColors,
      control: 'select',
    },
    theme: {
      options: avatarThemes,
      control: 'radio',
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

const renderLabel = (label: string) => (
  <div
    style={{
      color: 'var(--text-base-tertiary)',
      fontSize: 'var(--typography-size-caption-m)',
      lineHeight: 'var(--typography-line-height-caption-m)',
      textAlign: 'center',
    }}
  >
    {label}
  </div>
);

const renderInitialsContent = (size: TAvatarSize, value: string) => (
  <Typography size={avatarTextSizeByAvatarSize[size]} weight={'medium'}>
    <p style={{ margin: 0 }}>{value}</p>
  </Typography>
);

const renderIconContent = () => <User3LineIcon />;

const renderAvatarContent = (content: TAvatarContent, size: TAvatarSize) => {
  switch (content) {
    case 'userpic':
      return <Image src={userpicSource} />;
    case 'empty':
      return void 0;
    case 'initials':
      return renderInitialsContent(size, 'B');
    case 'icon':
      return renderIconContent();
  }
};

export const Default: Story = {
  render(args) {
    return <Avatar {...args}>{renderInitialsContent(args.size ?? '2xl', 'B')}</Avatar>;
  },
};

export const Types: Story = {
  render(args) {
    return (
      <div style={{ display: 'grid', gap: 'var(--numbers-16)' }}>
        {renderSectionTitle('Types')}

        <div
          style={{
            alignItems: 'start',
            display: 'grid',
            gap: 'var(--numbers-24)',
            gridTemplateColumns: 'repeat(4, var(--numbers-96))',
          }}
        >
          {avatarContentVariants.map((content) => (
            <div
              key={content}
              style={{
                display: 'grid',
                gap: 'var(--numbers-8)',
                justifyItems: 'center',
              }}
            >
              <Avatar {...args}>{renderAvatarContent(content, args.size ?? '2xl')}</Avatar>
              {renderLabel(content)}
            </div>
          ))}
        </div>
      </div>
    );
  },
};

export const ColorMatrix: Story = {
  render(args) {
    return (
      <div style={{ display: 'grid', gap: 'var(--numbers-24)' }}>
        {avatarThemes.map((theme) => (
          <div key={theme} style={{ display: 'grid', gap: 'var(--numbers-16)' }}>
            {renderSectionTitle(theme)}

            <div
              style={{
                alignItems: 'start',
                display: 'grid',
                gap: 'var(--numbers-20)',
                gridTemplateColumns: 'repeat(7, var(--numbers-72))',
              }}
            >
              {avatarColors.map((color) => (
                <div
                  key={`${theme}-${color}`}
                  style={{
                    display: 'grid',
                    gap: 'var(--numbers-8)',
                    justifyItems: 'center',
                  }}
                >
                  <Avatar {...args} color={color} theme={theme}>
                    {renderInitialsContent(args.size ?? '2xl', 'B')}
                  </Avatar>
                  {renderLabel(color)}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  },
};

export const SizeMatrix: Story = {
  render(args) {
    return (
      <div style={{ display: 'grid', gap: 'var(--numbers-24)' }}>
        {avatarContentVariants.map((content) => (
          <div key={content} style={{ display: 'grid', gap: 'var(--numbers-16)' }}>
            {renderSectionTitle(content)}

            <div
              style={{
                alignItems: 'end',
                display: 'grid',
                gap: 'var(--numbers-20)',
                gridTemplateColumns: 'repeat(6, var(--numbers-72))',
              }}
            >
              {avatarSizes.map((size) => (
                <div
                  key={`${content}-${size}`}
                  style={{
                    display: 'grid',
                    gap: 'var(--numbers-8)',
                    justifyItems: 'center',
                  }}
                >
                  <Avatar {...args} size={size}>
                    {renderAvatarContent(content, size)}
                  </Avatar>
                  {renderLabel(size)}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  },
};
