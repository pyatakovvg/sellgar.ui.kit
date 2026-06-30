import type { Meta, StoryObj } from '@storybook/react-vite';

import { Popover, MenuItem, Button } from '@sellgar/kit';
import {
  DeleteBinLineIcon,
  FileCopyLineIcon,
  More2FillIcon,
  PencilLineIcon,
  Settings3LineIcon,
  ShareLineIcon,
} from '@sellgar/kit/icons';

const meta: Meta<typeof Popover> = {
  title: 'Kit/Overlay/Popover',
  component: Popover,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    placement: {
      options: [
        'top',
        'right',
        'bottom',
        'left',
        'top-start',
        'top-end',
        'right-start',
        'right-end',
        'bottom-start',
        'bottom-end',
        'left-start',
        'left-end',
      ],
      control: 'select',
    },
  },
};

type Story = StoryObj<typeof meta>;
export default meta;

export const Default: Story = {
  args: {},
  render: (args) => (
    <Popover {...args}>
      <Popover.Trigger>
        <Button.Icon shape="pill" size="md" style="ghost" leadIcon={<More2FillIcon />} />
      </Popover.Trigger>
      <Popover.Content>
        <MenuItem leadIcon={<PencilLineIcon />} caption={'Изменить URL'} />
        <MenuItem leadIcon={<FileCopyLineIcon />} caption={'Копировать ссылку'} />
      </Popover.Content>
    </Popover>
  ),
};

export const CustomIcon: Story = {
  args: {},
  render: (args) => (
    <Popover {...args}>
      <Popover.Trigger>
        <Button.Icon shape="pill" size="md" style="ghost" leadIcon={<Settings3LineIcon />} />
      </Popover.Trigger>
      <Popover.Content>
        <MenuItem leadIcon={<PencilLineIcon />} caption={'Редактировать'} />
        <MenuItem leadIcon={<DeleteBinLineIcon />} caption={'Удалить'} />
      </Popover.Content>
    </Popover>
  ),
};

export const CustomContent: Story = {
  args: {},
  render: (args) => (
    <Popover {...args}>
      <Popover.Trigger>
        <Button.Icon shape="pill" size="md" style="ghost" leadIcon={<More2FillIcon />} />
      </Popover.Trigger>
      <Popover.Content>
        <div
          style={{
            padding: 'var(--numbers-12) var(--numbers-16)',
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--numbers-8)',
            maxWidth: '240px',
          }}
        >
          <p
            style={{
              color: 'var(--text-base-secondary)',
              margin: 0,
              fontSize: 'var(--typography-caption-m-size)',
              fontWeight: 600,
            }}
          >
            Информация
          </p>
          <p style={{ color: 'var(--text-base-primary)', margin: 0, fontSize: 'var(--typography-caption-l-size)' }}>
            Сюда можно вставить любой контент: текст, ссылки, формы.
          </p>
        </div>
      </Popover.Content>
    </Popover>
  ),
};

export const CustomTrigger: Story = {
  args: {},
  render: (args) => (
    <Popover {...args}>
      <Popover.Trigger>
        <button
          style={{
            padding: 'var(--numbers-8) var(--numbers-16)',
            cursor: 'pointer',
            borderRadius: 'var(--measurements-radius-md)',
            border: 'var(--numbers-1) solid var(--border-action-normal)',
          }}
        >
          Открыть меню
        </button>
      </Popover.Trigger>
      <Popover.Content>
        <MenuItem leadIcon={<PencilLineIcon />} caption={'Изменить URL'} />
        <MenuItem leadIcon={<FileCopyLineIcon />} caption={'Копировать ссылку'} />
        <MenuItem leadIcon={<ShareLineIcon />} caption={'Поделиться'} />
      </Popover.Content>
    </Popover>
  ),
};
