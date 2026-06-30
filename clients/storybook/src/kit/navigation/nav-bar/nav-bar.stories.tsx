import type { Meta, StoryObj } from '@storybook/react-vite';

import { NavBar } from '@sellgar/kit';
import { Apps2FillIcon, BarChartFillIcon, GroupFillIcon, Store2FillIcon } from '@sellgar/kit/icons';

const meta: Meta = {
  title: 'Kit/Navigation/NavBar',
  component: NavBar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {},
  argTypes: {},
};

type Story = StoryObj<typeof meta>;
export default meta;

export const Default: Story = {
  args: {},
  render: () => {
    return (
      <div style={{ display: 'flex', width: '500px', height: '400px' }}>
        <NavBar>
          <NavBar.Item icon={<BarChartFillIcon />} caption={'Аналитика'} isActive />
          <NavBar.Item icon={<Store2FillIcon />} caption={'Точки продаж'} />
          <NavBar.Item icon={<GroupFillIcon />} caption={'Компания'} />
          <NavBar.Item icon={<Apps2FillIcon />} caption={'Возможности'} />
        </NavBar>
      </div>
    );
  },
};
