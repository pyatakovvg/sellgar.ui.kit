import type { Meta, StoryObj } from '@storybook/react';

import React from 'react';
import { Modal, Button } from '@sellgar/kit/development';

const meta: Meta<typeof Modal> = {
  title: 'Kit/Symbols/Modal',
  component: Modal,
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
  render() {
    const [open, setOpen] = React.useState(false);

    return (
      <>
        <Button onClick={() => setOpen(true)}>Open modal</Button>
        <Modal open={open} onClose={() => setOpen(false)} onOpen={() => console.log('Open')}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              flex: '1 0 auto',
              height: '100px',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '12px',
              border: '1px dashed #924FE8',
              background: '#ECDFFB',
              color: '#5314A3',
              boxShadow: '0 1px 2px 0 rgba(20, 21, 26, 0.05)',
            }}
          >
            <p>Slot</p>
          </div>
        </Modal>
      </>
    );
  },
};
