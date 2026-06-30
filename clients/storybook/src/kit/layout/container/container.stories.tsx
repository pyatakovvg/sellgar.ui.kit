import type { Meta, StoryObj } from '@storybook/react-vite';

import { Badge, Container } from '@sellgar/kit';

const meta: Meta<typeof Container> = {
  title: 'Kit/Layout/Container',
  component: Container,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
};

type Story = StoryObj<typeof meta>;
export default meta;

export const Default: Story = {
  render: () => (
    <Container>
      <div style={{ display: 'grid', gap: 16, padding: 24 }}>
        <Badge label={'Контент внутри контейнера'} color={'blue'} />
        <div style={{ minHeight: 120, borderRadius: 16, background: '#f3f4f6' }} />
      </div>
    </Container>
  ),
};
