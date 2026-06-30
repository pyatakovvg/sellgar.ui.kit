import type { Meta, StoryObj } from '@storybook/react-vite';

import React from 'react';
import { Modal, Button } from '@sellgar/kit';

const meta: Meta<typeof Modal> = {
  title: 'Kit/Overlay/Modal',
  component: Modal,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    open: false,
  },
  argTypes: {
    open: {
      control: 'boolean',
    },
    onClose: {
      table: {
        disable: true,
      },
    },
    children: {
      table: {
        disable: true,
      },
    },
  },
};

type Story = StoryObj<typeof meta>;
export default meta;

export const Default: Story = {
  render: (args) => {
    const [open, setOpen] = React.useState(args.open);

    React.useEffect(() => {
      setOpen(args.open);
    }, [args.open]);

    return (
      <div style={{ display: 'flex', justifyContent: 'center', padding: 24 }}>
        <Button onClick={() => setOpen(true)}>Open modal</Button>
        <Modal open={open} onClose={() => setOpen(false)}>
          <section
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 16,
              minWidth: 360,
              padding: '56px 24px 24px',
            }}
          >
            <Modal.Close />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <strong style={{ fontSize: 20, lineHeight: '24px' }}>Delete draft?</strong>
              <p style={{ margin: 0, color: 'var(--text-base-secondary)' }}>
                The draft will be removed permanently. This action cannot be undone.
              </p>
            </div>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: 12,
              }}
            >
              <Modal.Close>
                <Button style={'secondary'}>Cancel</Button>
              </Modal.Close>
              <Button target={'destructive'} onClick={() => setOpen(false)}>
                Delete
              </Button>
            </div>
          </section>
        </Modal>
      </div>
    );
  },
};
