import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { StickyLayout } from '@sellgar/kit';

const meta: Meta<typeof StickyLayout> = {
  title: 'Kit/Wrappers/StickyLayout',
  component: StickyLayout,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

type Story = StoryObj<typeof meta>;

export default meta;

const StickyLayoutWithScrollbar: React.FC<{ children: React.ReactNode; stickyOffset?: number }> = ({ children, stickyOffset = 16 }) => {
  return (
    <StickyLayout gap={24} scrollbarStyle={{ height: 520, border: '1px solid #dadce5', borderRadius: 12 }}>
      <StickyLayout.Sticky
        offset={stickyOffset}
        style={{
          width: 280,
          border: '1px solid #dadce5',
          borderRadius: 12,
          padding: 16,
          background: '#fff',
        }}
      >
        <strong>Sticky panel</strong>
        <p style={{ marginTop: 12 }}>Этот блок закрепляется при скролле.</p>
      </StickyLayout.Sticky>

      <StickyLayout.Static>{children}</StickyLayout.Static>
    </StickyLayout>
  );
};

const VerticalFourBlocksExample: React.FC = () => {
  return (
    <StickyLayout
      style={{ flexDirection: 'column' }}
      gap={16}
      stickyAutoOffsetPadding={12}
      stickyAutoOffsetGap={8}
      scrollbarStyle={{ height: 520, border: '1px solid #dadce5', borderRadius: 12 }}
    >
      <StickyLayout.Static style={{ width: '100%' }}>
        <div style={{ border: '1px solid #dadce5', borderRadius: 12, padding: 16, background: '#fff' }}>
          <strong>Блок 1 (обычный)</strong>
          <p style={{ margin: '8px 0 0' }}>Статичный блок в вертикальном потоке.</p>
        </div>
      </StickyLayout.Static>

      <StickyLayout.Sticky autoOffset style={{ width: '100%' }}>
        <div style={{ border: '1px solid #c9d8ff', borderRadius: 12, padding: 16, background: '#edf3ff' }}>
          <strong>Блок 2 (sticky)</strong>
          <p style={{ margin: '8px 0 0' }}>Первый закрепляемый блок.</p>
        </div>
      </StickyLayout.Sticky>

      <StickyLayout.Static style={{ width: '100%' }}>
        <div style={{ border: '1px solid #dadce5', borderRadius: 12, padding: 16, background: '#fff' }}>
          <strong>Блок 3 (обычный)</strong>
          {Array.from({ length: 10 }).map((_, index) => (
            <p key={index} style={{ margin: '8px 0 0' }}>
              Контент #{index + 1}
            </p>
          ))}
        </div>
      </StickyLayout.Static>

      <StickyLayout.Sticky autoOffset style={{ width: '100%' }}>
        <div style={{ border: '1px solid #ffe0b8', borderRadius: 12, padding: 16, background: '#fff6e8' }}>
          <strong>Блок 4 (sticky)</strong>
          <p style={{ margin: '8px 0 0' }}>Прилипает сразу под блоком 2.</p>
        </div>
      </StickyLayout.Sticky>

      <StickyLayout.Static style={{ width: '100%' }}>
        <div style={{ border: '1px solid #dadce5', borderRadius: 12, padding: 16, background: '#fff' }}>
          <strong>Блок 5 (обычный)</strong>
          {Array.from({ length: 12 }).map((_, index) => (
            <p key={index} style={{ margin: '8px 0 0' }}>
              Длинный контент #{index + 1}
            </p>
          ))}
        </div>
      </StickyLayout.Static>

      <StickyLayout.Sticky autoOffset style={{ width: '100%' }}>
        <div style={{ border: '1px solid #c7efda', borderRadius: 12, padding: 16, background: '#effcf4' }}>
          <strong>Блок 6 (sticky)</strong>
          <p style={{ margin: '8px 0 0' }}>Прилипает под блоком 4.</p>
        </div>
      </StickyLayout.Sticky>

      <StickyLayout.Static style={{ width: '100%' }}>
        <div style={{ border: '1px solid #dadce5', borderRadius: 12, padding: 16, background: '#fff' }}>
          <strong>Блок 7 (обычный)</strong>
          {Array.from({ length: 14 }).map((_, index) => (
            <p key={index} style={{ margin: '8px 0 0' }}>
              Промежуточный контент #{index + 1}
            </p>
          ))}
        </div>
      </StickyLayout.Static>

      <StickyLayout.Sticky autoOffset style={{ width: '100%' }}>
        <div style={{ border: '1px solid #e1d0ff', borderRadius: 12, padding: 16, background: '#f6f1ff' }}>
          <strong>Блок 8 (sticky)</strong>
          <p style={{ margin: '8px 0 0' }}>Формирует стек sticky-блоков.</p>
        </div>
      </StickyLayout.Sticky>
    </StickyLayout>
  );
};

export const Default: Story = {
  render: () => (
    <StickyLayoutWithScrollbar>
      <div style={{ border: '1px solid #dadce5', borderRadius: 12, padding: 16, background: '#fff' }}>
        {Array.from({ length: 30 }).map((_, index) => (
          <p key={index} style={{ marginBottom: 12 }}>
            Обычный контент #{index + 1}
          </p>
        ))}
      </div>
    </StickyLayoutWithScrollbar>
  ),
};

export const PageLayoutExample: Story = {
  render: () => (
    <div style={{ padding: 24, background: '#f7f8fc', minHeight: '100vh' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <StickyLayoutWithScrollbar stickyOffset={24}>
          <article style={{ border: '1px solid #dadce5', borderRadius: 12, padding: 20, background: '#fff' }}>
            <h2 style={{ marginTop: 0 }}>Контент страницы</h2>
            {Array.from({ length: 36 }).map((_, index) => (
              <p key={index} style={{ marginBottom: 14 }}>
                Параграф #{index + 1}. Основной контент, который скроллится, пока справа остается sticky-блок.
              </p>
            ))}
          </article>
        </StickyLayoutWithScrollbar>
      </div>
    </div>
  ),
};

export const VerticalFourBlocks: Story = {
  render: () => <VerticalFourBlocksExample />,
};
