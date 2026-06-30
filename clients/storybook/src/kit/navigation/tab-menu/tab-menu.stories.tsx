import { Badge, TabMenu, iconName } from '@sellgar/kit';

import type { Meta, StoryObj } from '@storybook/react-vite';
import type React from 'react';

import { iconMapping } from '../../../utils/iconMapping.tsx';

import s from './default.module.css';

const meta: Meta<typeof TabMenu> = {
  title: 'Kit/Navigation/TabMenu',
  component: TabMenu,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    defaultTabName: 'tab-2',
  },
};

type Story = StoryObj<typeof meta>;
export default meta;

interface ITabMenuStoryItem {
  readonly badge?: React.ReactNode;
  readonly name: string;
  readonly title: string;
}

const tabItems: readonly ITabMenuStoryItem[] = [
  { name: 'tab-1', title: 'Label' },
  { name: 'tab-2', title: 'Label', badge: <Badge label={'12'} /> },
  { name: 'tab-3', title: 'Label' },
  { name: 'tab-4', title: 'Label', badge: <Badge label={'08'} /> },
  { name: 'tab-5', title: 'Label', badge: <Badge disabled label={'02'} /> },
] as const;

const icon = iconMapping[iconName.copyleftLine];

const renderTabs = (disabledName?: string) => {
  return tabItems.map((tabItem) => (
    <TabMenu.Tab
      key={tabItem.name}
      badge={tabItem.badge}
      disabled={disabledName === tabItem.name}
      leadIcon={icon}
      name={tabItem.name}
      tailIcon={icon}
      title={tabItem.title}
    />
  ));
};

const renderContent = () => {
  return tabItems.map((tabItem) => (
    <TabMenu.Content key={tabItem.name} name={tabItem.name}>
      <div className={s.content}>
        <p>{tabItem.title}</p>
      </div>
    </TabMenu.Content>
  ));
};

export const Default: Story = {
  render(args) {
    return (
      <div className={s.wrapper}>
        <TabMenu {...args}>
          <TabMenu.Fill size={'lg'} shape={'rounded'}>
            {renderTabs()}
          </TabMenu.Fill>
          {renderContent()}
        </TabMenu>
      </div>
    );
  },
};

export const Fill: Story = {
  render() {
    return (
      <div className={s.examples}>
        <section className={s.section}>
          <h3>lg / rounded</h3>
          <TabMenu defaultTabName={'tab-2'}>
            <TabMenu.Fill size={'lg'} shape={'rounded'}>
              {renderTabs()}
            </TabMenu.Fill>
          </TabMenu>
        </section>

        <section className={s.section}>
          <h3>md / pill</h3>
          <TabMenu defaultTabName={'tab-2'}>
            <TabMenu.Fill size={'md'} shape={'pill'}>
              {renderTabs()}
            </TabMenu.Fill>
          </TabMenu>
        </section>

        <section className={s.section}>
          <h3>sm / rounded / disabled badge</h3>
          <TabMenu defaultTabName={'tab-2'}>
            <TabMenu.Fill size={'sm'} shape={'rounded'}>
              {renderTabs('tab-5')}
            </TabMenu.Fill>
          </TabMenu>
        </section>
      </div>
    );
  },
};

export const Line: Story = {
  render() {
    return (
      <div className={s.examples}>
        <section className={s.section}>
          <h3>lg</h3>
          <TabMenu defaultTabName={'tab-2'}>
            <TabMenu.Line size={'lg'}>{renderTabs()}</TabMenu.Line>
          </TabMenu>
        </section>

        <section className={s.section}>
          <h3>md</h3>
          <TabMenu defaultTabName={'tab-2'}>
            <TabMenu.Line size={'md'}>{renderTabs()}</TabMenu.Line>
          </TabMenu>
        </section>

        <section className={s.section}>
          <h3>sm / disabled badge</h3>
          <TabMenu defaultTabName={'tab-2'}>
            <TabMenu.Line size={'sm'}>{renderTabs('tab-5')}</TabMenu.Line>
          </TabMenu>
        </section>
      </div>
    );
  },
};

export const Segmented: Story = {
  render() {
    return (
      <div className={s.examples}>
        <section className={s.section}>
          <h3>lg / rounded</h3>
          <TabMenu defaultTabName={'tab-2'}>
            <TabMenu.Segmented size={'lg'} shape={'rounded'}>
              {renderTabs()}
            </TabMenu.Segmented>
          </TabMenu>
        </section>

        <section className={s.section}>
          <h3>md / pill</h3>
          <TabMenu defaultTabName={'tab-2'}>
            <TabMenu.Segmented size={'md'} shape={'pill'}>
              {renderTabs()}
            </TabMenu.Segmented>
          </TabMenu>
        </section>

        <section className={s.section}>
          <h3>sm / rounded / disabled badge</h3>
          <TabMenu defaultTabName={'tab-2'}>
            <TabMenu.Segmented size={'sm'} shape={'rounded'}>
              {renderTabs('tab-5')}
            </TabMenu.Segmented>
          </TabMenu>
        </section>
      </div>
    );
  },
};
