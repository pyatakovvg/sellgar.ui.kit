import type { Meta, StoryObj } from '@storybook/react-vite';

import { LinkTypography, Typography } from '@sellgar/kit';

const meta: Meta<typeof LinkTypography> = {
  title: 'Kit/Content/LinkTypography',
  component: LinkTypography,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
};

type Story = StoryObj<typeof meta>;

export default meta;

export const Default: Story = {
  render(args) {
    return (
      <Typography size={'body-s'} weight={'medium'}>
        <LinkTypography {...args}>
          <a href={'https://tiyn.dev'}>Открыть документацию</a>
        </LinkTypography>
      </Typography>
    );
  },
};

export const InlineText: Story = {
  render(args) {
    return (
      <div style={{ maxWidth: 640 }}>
        <Typography size={'body-s'} weight={'regular'}>
          <p>
            Компонент добавляет ссылке цвет и hover-состояние, не меняя семантику вложенного тега. Используйте его там,
            где ссылка живёт внутри обычного текстового потока:{' '}
            <LinkTypography {...args}>
              <a href={'https://tiyn.dev'}>подробнее о правилах</a>
            </LinkTypography>
            .
          </p>
        </Typography>
      </div>
    );
  },
};

export const Scale: Story = {
  render(args) {
    return (
      <div style={{ display: 'grid', gap: 12 }}>
        {(['body-l', 'body-m', 'body-s', 'caption-l', 'caption-m'] as const).map((size) => (
          <Typography key={size} size={size} weight={'medium'}>
            <LinkTypography {...args}>
              <a href={'https://tiyn.dev'}>{size} link typography</a>
            </LinkTypography>
          </Typography>
        ))}
      </div>
    );
  },
};
