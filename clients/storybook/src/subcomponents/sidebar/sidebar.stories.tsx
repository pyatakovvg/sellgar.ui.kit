import type { Meta, StoryObj } from '@storybook/react';

import { User, Badge, Sidebar, MenuItem } from '@sellgar/kit';

const meta: Meta = {
  title: 'Kit/SubComponents/Sidebar',
  component: Sidebar,
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
      <div style={{ display: 'flex', width: '280px', height: '400px' }}>
        <Sidebar>
          <Sidebar.Top>
            <Sidebar.Additional>
              <User name={'Пятаков В.Г.'} email={'viktor@mail.ru'} badge={'Админ'} />
            </Sidebar.Additional>
          </Sidebar.Top>
          <Sidebar.Divider />
          <Sidebar.Middle>
            <Sidebar.Cell>
              <MenuItem leadicon={'reactjs-line'} caption={'Бренд'} />
            </Sidebar.Cell>
            <Sidebar.Cell>
              <MenuItem leadicon={'price-tag-3-fill'} caption={'Товары'} />
            </Sidebar.Cell>
            <Sidebar.Cell>
              <MenuItem leadicon={'user-3-fill'} caption={'Пользователи'} badge={<Badge label={12} />} />
            </Sidebar.Cell>
          </Sidebar.Middle>
          <Sidebar.Bottom>
            <Sidebar.Cell>
              <MenuItem leadicon={'settings-3-fill'} caption={'Настройки'} />
            </Sidebar.Cell>
          </Sidebar.Bottom>
        </Sidebar>
      </div>
    );
  },
};
