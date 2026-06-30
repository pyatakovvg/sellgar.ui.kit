import { Drawer, Button } from '@sellgar/kit';
import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { Content } from './content';

const meta: Meta<typeof Drawer> = {
  title: 'Kit/Overlay/Drawer',
  component: Drawer,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

type Story = StoryObj<typeof meta>;
export default meta;

export const Default: Story = {
  render: () => {
    const [open, setOpen] = React.useState(false);

    return (
      <>
        <Button onClick={() => setOpen(true)}>Открыть Drawer</Button>
        <Drawer open={open} onClose={() => setOpen(false)} onRequestClose={() => window.confirm('Закрыть drawer?')}>
          <Content />
        </Drawer>
      </>
    );
  },
};
