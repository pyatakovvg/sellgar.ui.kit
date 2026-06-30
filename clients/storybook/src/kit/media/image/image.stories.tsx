import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { Image } from '@sellgar/kit';

const dataUrl =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" width="480" height="320" viewBox="0 0 480 320">
      <defs>
        <linearGradient id="g" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stop-color="#dbeafe" />
          <stop offset="100%" stop-color="#bfdbfe" />
        </linearGradient>
      </defs>
      <rect width="480" height="320" fill="url(#g)" rx="24" />
      <circle cx="120" cy="90" r="42" fill="#60a5fa" />
      <circle cx="360" cy="110" r="64" fill="#93c5fd" />
      <path d="M60 250l90-80 70 55 70-90 130 115H60z" fill="#1d4ed8" opacity="0.85" />
    </svg>
  `);

const DelayedImage: React.FC<React.ComponentProps<typeof Image>> = (props) => {
  const [src, setSrc] = React.useState<string | undefined>(undefined);

  React.useEffect(() => {
    const timer = window.setTimeout(() => setSrc(dataUrl), 1500);
    return () => window.clearTimeout(timer);
  }, []);

  return <Image {...props} src={src} />;
};

const meta: Meta<typeof Image> = {
  title: 'Kit/Media/Image',
  component: Image,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  args: {
    width: 320,
    height: 220,
  },
};

type Story = StoryObj<typeof meta>;
export default meta;

export const Default: Story = {
  render: (args) => <Image {...args} src={dataUrl} />,
};

export const LoadingState: Story = {
  render: (args) => <DelayedImage {...args} />,
};

export const ErrorState: Story = {
  render: (args) => <Image {...args} src={'/__storybook_missing_image__.png'} />,
};
