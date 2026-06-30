import type { Meta, StoryObj } from '@storybook/react-vite';

import { Badge, Sidebar, MenuItem, User, Button } from '@sellgar/kit';
import { PriceTag3FillIcon, ReactjsLineIcon, Settings3FillIcon, User3FillIcon } from '@sellgar/kit/icons';

const meta: Meta = {
  title: 'Kit/Navigation/Sidebar',
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
            <Sidebar.State>
              <Sidebar.Collapsed>
                <User name={'Василий Федорович Пупкин'} badge={'Админ'} hideUser />
              </Sidebar.Collapsed>
              <Sidebar.Expanded>
                <User name={'Василий Федорович Пупкин'} badge={'Админ'} />
              </Sidebar.Expanded>
            </Sidebar.State>
          </Sidebar.Top>
          <Sidebar.Divider />
          <Sidebar.Middle>
            <Sidebar.Additional>
              <Sidebar.State>
                <Sidebar.Collapsed>
                  <Button.Icon leadIcon={<Settings3FillIcon />} size={'sm'} />
                </Sidebar.Collapsed>
                <Sidebar.Expanded>
                  <Button leadIcon={<Settings3FillIcon />} size={'sm'}>
                    Test
                  </Button>
                </Sidebar.Expanded>
              </Sidebar.State>
            </Sidebar.Additional>
            <Sidebar.Divider />
            <Sidebar.Cell>
              <Sidebar.State>
                <Sidebar.Collapsed>
                  <MenuItem.Icon leadIcon={<ReactjsLineIcon />} isActive />
                </Sidebar.Collapsed>
                <Sidebar.Expanded>
                  <MenuItem leadIcon={<ReactjsLineIcon />} caption={'Бренд'} isActive />
                </Sidebar.Expanded>
              </Sidebar.State>
            </Sidebar.Cell>
            <Sidebar.Cell>
              <Sidebar.State>
                <Sidebar.Collapsed>
                  <MenuItem.Icon leadIcon={<PriceTag3FillIcon />} />
                </Sidebar.Collapsed>
                <Sidebar.Expanded>
                  <MenuItem leadIcon={<PriceTag3FillIcon />} caption={'Товары'} />
                </Sidebar.Expanded>
              </Sidebar.State>
            </Sidebar.Cell>
            <Sidebar.Cell>
              <Sidebar.State>
                <Sidebar.Collapsed>
                  <MenuItem.Icon leadIcon={<User3FillIcon />} badge={<Badge label={12} />} />
                </Sidebar.Collapsed>
                <Sidebar.Expanded>
                  <MenuItem leadIcon={<User3FillIcon />} caption={'Пользователи'} badge={<Badge label={12} />} />
                </Sidebar.Expanded>
              </Sidebar.State>
            </Sidebar.Cell>
          </Sidebar.Middle>
          <Sidebar.Bottom>
            <Sidebar.Cell>
              <Sidebar.State>
                <Sidebar.Collapsed>
                  <MenuItem.Icon leadIcon={<Settings3FillIcon />} />
                </Sidebar.Collapsed>
                <Sidebar.Expanded>
                  <MenuItem leadIcon={<Settings3FillIcon />} caption={'Настройки'} />
                </Sidebar.Expanded>
              </Sidebar.State>
            </Sidebar.Cell>
          </Sidebar.Bottom>
        </Sidebar>
      </div>
    );
  },
};
