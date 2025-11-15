import type { Meta, StoryObj } from '@storybook/react';

import { Dot } from '@sellgar/kit/development';

const meta: Meta<typeof Dot> = {
  title: 'Kit/Misc/Dot',
  component: Dot,
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
      <div style={{ width: 200 }}>
        <div style={{ display: 'flex' }}>
          <div>
            <Dot size={'xs'} />
          </div>
          <div style={{ marginLeft: 19 }}>
            <Dot size={'sm'} />
          </div>
          <div style={{ marginLeft: 19 }}>
            <Dot size={'md'} />
          </div>
          <div style={{ marginLeft: 19 }}>
            <Dot size={'lg'} />
          </div>
          <div style={{ marginLeft: 19 }}>
            <Dot size={'xl'} />
          </div>
          <div style={{ marginLeft: 19 }}>
            <Dot size={'2xl'} />
          </div>
        </div>
        <div style={{ display: 'flex', marginTop: 19 }}>
          <div>
            <Dot size={'xs'} color={'red'} />
          </div>
          <div style={{ marginLeft: 19 }}>
            <Dot size={'sm'} color={'red'} />
          </div>
          <div style={{ marginLeft: 19 }}>
            <Dot size={'md'} color={'red'} />
          </div>
          <div style={{ marginLeft: 19 }}>
            <Dot size={'lg'} color={'red'} />
          </div>
          <div style={{ marginLeft: 19 }}>
            <Dot size={'xl'} color={'red'} />
          </div>
          <div style={{ marginLeft: 19 }}>
            <Dot size={'2xl'} color={'red'} />
          </div>
        </div>
        <div style={{ display: 'flex', marginTop: 19 }}>
          <div>
            <Dot size={'xs'} color={'orange'} />
          </div>
          <div style={{ marginLeft: 19 }}>
            <Dot size={'sm'} color={'orange'} />
          </div>
          <div style={{ marginLeft: 19 }}>
            <Dot size={'md'} color={'orange'} />
          </div>
          <div style={{ marginLeft: 19 }}>
            <Dot size={'lg'} color={'orange'} />
          </div>
          <div style={{ marginLeft: 19 }}>
            <Dot size={'xl'} color={'orange'} />
          </div>
          <div style={{ marginLeft: 19 }}>
            <Dot size={'2xl'} color={'orange'} />
          </div>
        </div>
        <div style={{ display: 'flex', marginTop: 19 }}>
          <div>
            <Dot size={'xs'} color={'green'} />
          </div>
          <div style={{ marginLeft: 19 }}>
            <Dot size={'sm'} color={'green'} />
          </div>
          <div style={{ marginLeft: 19 }}>
            <Dot size={'md'} color={'green'} />
          </div>
          <div style={{ marginLeft: 19 }}>
            <Dot size={'lg'} color={'green'} />
          </div>
          <div style={{ marginLeft: 19 }}>
            <Dot size={'xl'} color={'green'} />
          </div>
          <div style={{ marginLeft: 19 }}>
            <Dot size={'2xl'} color={'green'} />
          </div>
        </div>
        <div style={{ display: 'flex', marginTop: 19 }}>
          <div>
            <Dot size={'xs'} color={'blue'} />
          </div>
          <div style={{ marginLeft: 19 }}>
            <Dot size={'sm'} color={'blue'} />
          </div>
          <div style={{ marginLeft: 19 }}>
            <Dot size={'md'} color={'blue'} />
          </div>
          <div style={{ marginLeft: 19 }}>
            <Dot size={'lg'} color={'blue'} />
          </div>
          <div style={{ marginLeft: 19 }}>
            <Dot size={'xl'} color={'blue'} />
          </div>
          <div style={{ marginLeft: 19 }}>
            <Dot size={'2xl'} color={'blue'} />
          </div>
        </div>
        <div style={{ display: 'flex', marginTop: 19 }}>
          <div>
            <Dot size={'xs'} color={'purple'} />
          </div>
          <div style={{ marginLeft: 19 }}>
            <Dot size={'sm'} color={'purple'} />
          </div>
          <div style={{ marginLeft: 19 }}>
            <Dot size={'md'} color={'purple'} />
          </div>
          <div style={{ marginLeft: 19 }}>
            <Dot size={'lg'} color={'purple'} />
          </div>
          <div style={{ marginLeft: 19 }}>
            <Dot size={'xl'} color={'purple'} />
          </div>
          <div style={{ marginLeft: 19 }}>
            <Dot size={'2xl'} color={'purple'} />
          </div>
        </div>
      </div>
    );
  },
};
