import type { Meta, StoryObj } from '@storybook/react';

import { Input, Icon, BaseOption, Dropdown } from '@sellgar/kit';
import React from 'react';

const meta: Meta<typeof Dropdown> = {
  title: 'Kit/Symbols/Dropdown',
  component: Dropdown,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    optionKey: 'uuid',
    optionValue: 'name',
    options: [
      { uuid: 'e7b8f1b4-6c9c-4c5e-9b3e-3e6d1b2e1f2e1', name: 'Иванов Иван Иванович', role: 'Адм.' },
      { uuid: 'e7b8f1b4-6c9c-4c5e-9b3e-3e6d1b2e1f2e2', name: 'Иванов Иван Иванович', role: 'Адм.' },
      { uuid: 'e7b8f1b4-6c9c-4c5e-9b3e-3e6d1b2e1f2e3', name: 'Иванов Иван Иванович', role: 'Адм.' },
      { uuid: 'e7b8f1b4-6c9c-4c5e-9b3e-3e6d1b2e1f2e4', name: 'Иванов Иван Иванович', role: 'Адм.' },
      { uuid: 'e7b8f1b4-6c9c-4c5e-9b3e-3e6d1b2e1f2e5', name: 'Иванов Иван Иванович', role: 'Адм.' },
      { uuid: 'e7b8f1b4-6c9c-4c5e-9b3e-3e6d1b2e1f2e6', name: 'Иванов Иван Иванович', role: 'Адм.' },
      { uuid: 'e7b8f1b4-6c9c-4c5e-9b3e-3e6d1b2e1f2e7', name: 'Иванов Иван Иванович', role: 'Адм.' },
      { uuid: 'e7b8f1b4-6c9c-4c5e-9b3e-3e6d1b2e1f2e8', name: 'Иванов Иван Иванович', role: 'Адм.' },
      { uuid: 'e7b8f1b4-6c9c-4c5e-9b3e-3e6d1b2e1f2e9', name: 'Иванов Иван Иванович', role: 'Адм.' },
      { uuid: 'e7b8f1b4-6c9c-4c5e-9b3e-3e6d1b2e1f2e0', name: 'Иванов Иван Иванович', role: 'Адм.' },
      { uuid: 'e7b8f1b4-6c9c-4c5e-9b3e-3e6d1b2e1f2e11', name: 'Иванов Иван Иванович', role: 'Адм.' },
      { uuid: 'a3c1f5d6-4e7b-4f1e-ae1b-7e5d4f3a2b1c', name: 'Петров Петр Петрович', role: 'Адм.' },
      { uuid: 'd2e5c9a2-3f1b-4e7c-8b3e-1c5d4e2b1a2d', name: 'Сидоров Сидор Сидорович', role: 'Адм.' },
      { uuid: 'f1a3b5d7-2c4e-4c1a-9e2b-6e5d4c3a1b1e', name: 'Кузнецов Алексей Николаевич', role: 'Польз.' },
      { uuid: 'b4a2e1c7-5f3d-4c5e-8c2e-9d5c4b3a2f1a', name: 'Смирнова Анна Сергеевна', role: 'Польз.' },
      { uuid: 'c7e4b9d3-1d5f-4c2e-a5c3-8b4d2e3a1f2b', name: 'Лебедев Дмитрий Александрович', role: 'Польз.' },
      { uuid: 'a9c4d2e3-6b1f-4c3e-8b7e-5c2f4a1b3d1e', name: 'Федорова Мария Викторовна', role: 'Польз.' },
      { uuid: 'b2d5c3f1-4e8e-4b1a-9c2e-7e5d3b1a2f5c', name: 'Григорьев Николай Васильевич', role: 'Польз.' },
    ],
  },
  argTypes: {},
};

type Story = StoryObj<typeof meta>;
export default meta;

export const Default: Story = {
  args: {},
  render: (args) => {
    const [open, setOpen] = React.useState(false);
    const [inputValue, setInputValue] = React.useState('');

    const options = React.useMemo(
      () => args.options.filter((item) => item[args.optionValue].toLowerCase().startsWith(inputValue.toLowerCase())),
      [inputValue, args.options],
    );

    return (
      <Dropdown
        {...args}
        open={open}
        options={options}
        referenceElement={({ activeIndex, setActive }) => (
          <Input
            value={inputValue}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              const value = event.target.value;
              setInputValue(value);

              if (value) {
                setOpen(true);
                setActive(0);
              } else {
                setOpen(false);
              }
            }}
            onKeyDown={(event) => {
              if (event.key === 'Enter' && activeIndex != null && options[activeIndex]) {
                setInputValue(options[activeIndex][args.optionValue]);
                setActive(null);
                setOpen(false);
              }
            }}
          />
        )}
        optionElement={({ value, active, option }) => (
          <BaseOption
            active={active}
            leadicon={<Icon icon={'windy-fill'} />}
            label={value}
            badge={option.role}
            toggle={option.role === 'Адм.'}
          />
        )}
      />
    );
  },
};
