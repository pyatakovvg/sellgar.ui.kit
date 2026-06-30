import type { Meta, StoryObj } from '@storybook/react-vite';

import { Scrollbar } from '@sellgar/kit';

import s from './default.module.scss';

const rows = Array.from({ length: 24 }, (_, index) => `Строка ${index + 1}`);
const columns = Array.from({ length: 8 }, (_, index) => `Колонка ${index + 1}`);

const meta: Meta<typeof Scrollbar> = {
  title: 'Kit/Layout/Scrollbar',
  component: Scrollbar,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    children: {
      control: false,
    },
    className: {
      control: false,
    },
  },
};

type Story = StoryObj<typeof meta>;
export default meta;

export const Vertical: Story = {
  render: () => (
    <Scrollbar className={s.vertical}>
      <div className={s.list}>
        {rows.map((row) => (
          <div key={row} className={s.item}>
            {row}
          </div>
        ))}
      </div>
    </Scrollbar>
  ),
};

export const BothAxis: Story = {
  render: () => (
    <Scrollbar className={s.bothAxis}>
      <div className={s.grid}>
        {rows.map((row) =>
          columns.map((column) => (
            <div key={`${row}-${column}`} className={s.cell}>
              {row} / {column}
            </div>
          )),
        )}
      </div>
    </Scrollbar>
  ),
};
