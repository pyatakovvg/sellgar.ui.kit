import type { Meta, StoryObj } from '@storybook/react';

import { Avatar } from '@sellgar/kit/development';

const meta: Meta<typeof Avatar> = {
  title: 'Kit/Symbols/Avatar',
  component: Avatar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    size: '2xl',
    color: 'gray',
    isStatus: true,
    isNotification: true,
  },
  argTypes: {
    size: {
      options: ['2xl', 'xl', 'lg', 'md', 'sm', 'xs'],
      control: 'select',
    },
    color: {
      options: ['gray', 'green', 'blue', 'orange', 'red', 'purple'],
      control: 'select',
    },
  },
};

type Story = StoryObj<typeof meta>;
export default meta;

export const Default: Story = {
  args: {},
  // render: (args) => {
  //   return (
  //     <div style={{ width: '360px', height: '200px' }}>
  //       <Accordion {...args}>
  //         <div
  //           style={{
  //             display: 'flex',
  //             flexDirection: 'column',
  //             flex: '1 0 auto',
  //             height: '100px',
  //             alignItems: 'center',
  //             justifyContent: 'center',
  //             borderRadius: '12px',
  //             border: '1px dashed #924FE8',
  //             background: '#ECDFFB',
  //             color: '#5314A3',
  //             boxShadow: '0 1px 2px 0 rgba(20, 21, 26, 0.05)',
  //           }}
  //         >
  //           <p>Slot</p>
  //         </div>
  //       </Accordion>
  //     </div>
  //   );
  // },
};
