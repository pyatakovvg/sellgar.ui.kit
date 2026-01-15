import type { Meta, StoryObj } from '@storybook/react-vite';

import { Accordion, Icon, TIconName, iconName } from '@sellgar/kit';

const meta: Meta<typeof Accordion> = {
  title: 'Kit/Symbols/Accordion',
  component: Accordion,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    header: 'Headline text',
    description: 'Description',
    defaultState: true,
  },
  argTypes: {
    leadIcon: {
      options: [undefined, ...Object.keys(iconName)],
      control: 'select',
      type: 'string',
    },
    size: {
      options: ['lg', 'md'],
      control: 'select',
    },
    expanded: {
      control: 'boolean',
    },
  },
};

type Story = StoryObj<typeof meta>;
export default meta;

export const Default: Story = {
  args: {},
  render: (args) => {
    return (
      <div style={{ width: '360px', height: '200px' }}>
        <Accordion {...args} leadIcon={<Icon icon={(args.leadIcon as TIconName) ?? 'typhoon-fill'} />}>
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
        </Accordion>
      </div>
    );
  },
};
