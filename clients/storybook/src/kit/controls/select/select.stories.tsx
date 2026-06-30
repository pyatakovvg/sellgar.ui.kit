import type { Meta, StoryObj } from '@storybook/react-vite';

import { Select, Badge, ToolTip } from '@sellgar/kit';
import { InformationLineIcon, User3LineIcon } from '@sellgar/kit/icons';

const options = [
  { uuid: 'user-01', name: 'Иванов Иван Иванович', role: 'Адм.' },
  { uuid: 'user-02', name: 'Петров Петр Петрович', role: 'Адм.' },
  { uuid: 'user-03', name: 'Сидоров Сидор Сидорович', role: 'Адм.' },
  { uuid: 'user-04', name: 'Кузнецов Алексей Николаевич', role: 'Польз.' },
  { uuid: 'user-05', name: 'Смирнова Анна Сергеевна', role: 'Польз.' },
  { uuid: 'user-06', name: 'Лебедев Дмитрий Александрович', role: 'Польз.' },
  { uuid: 'user-07', name: 'Федорова Мария Викторовна', role: 'Польз.' },
  { uuid: 'user-08', name: 'Григорьев Николай Васильевич', role: 'Польз.' },
  { uuid: 'user-09', name: 'Васильева Елена Андреевна', role: 'Польз.' },
  { uuid: 'user-10', name: 'Морозов Артем Павлович', role: 'Польз.' },
  { uuid: 'user-11', name: 'Новикова Дарья Игоревна', role: 'Польз.' },
  { uuid: 'user-12', name: 'Орлов Максим Сергеевич', role: 'Польз.' },
  { uuid: 'user-13', name: 'Зайцева Полина Романовна', role: 'Польз.' },
  { uuid: 'user-14', name: 'Соловьев Кирилл Дмитриевич', role: 'Польз.' },
  { uuid: 'user-15', name: 'Борисова Виктория Олеговна', role: 'Польз.' },
  { uuid: 'user-16', name: 'Михайлов Андрей Валерьевич', role: 'Польз.' },
  { uuid: 'user-17', name: 'Козлова Алина Максимовна', role: 'Польз.' },
  { uuid: 'user-18', name: 'Волков Никита Евгеньевич', role: 'Польз.' },
  { uuid: 'user-19', name: 'Алексеева Софья Артемовна', role: 'Польз.' },
  { uuid: 'user-20', name: 'Семенов Даниил Русланович', role: 'Польз.' },
  { uuid: 'user-21', name: 'Павлова Ксения Денисовна', role: 'Польз.' },
  { uuid: 'user-22', name: 'Егоров Тимофей Ильич', role: 'Польз.' },
  { uuid: 'user-23', name: 'Степанова Милана Матвеевна', role: 'Польз.' },
  { uuid: 'user-24', name: 'Николаев Роман Константинович', role: 'Польз.' },
  { uuid: 'user-25', name: 'Андреева Варвара Глебовна', role: 'Польз.' },
  { uuid: 'user-26', name: 'Макаров Владислав Юрьевич', role: 'Польз.' },
  { uuid: 'user-27', name: 'Захарова Арина Тимуровна', role: 'Польз.' },
  { uuid: 'user-28', name: 'Киселев Матвей Олегович', role: 'Польз.' },
  { uuid: 'user-29', name: 'Сорокина Ева Александровна', role: 'Польз.' },
  { uuid: 'user-30', name: 'Тихонов Марк Вадимович', role: 'Польз.' },
] as const;

const meta: Meta<typeof Select> = {
  title: 'Kit/Controls/Select',
  component: Select,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    fixHeight: true,
    isClearable: false,
    disabled: false,
    leadIcon: <User3LineIcon />,
    tailIcon: (
      <ToolTip>
        <ToolTip.Trigger>
          <InformationLineIcon />
        </ToolTip.Trigger>
        <ToolTip.Content>
          <ToolTip.Content.Label>Tooltip headline</ToolTip.Content.Label>
          <ToolTip.Content.Caption>
            Tooltips display informative text when users hover over, focus on, or tap an element
          </ToolTip.Content.Caption>
        </ToolTip.Content>
      </ToolTip>
    ),
    badge: <Badge label={'⌘K'} />,
    optionKey: 'uuid',
    optionValue: 'name',
    options: [...options],
    placeholder: 'Сотрудники',
  },
  argTypes: {
    size: {
      options: ['xs', 'md'],
      control: 'select',
    },
    disabled: {
      control: 'boolean',
    },
    fixHeight: {
      control: 'boolean',
    },
    isClearable: {
      control: 'boolean',
    },
    target: {
      options: [undefined, 'destructive'],
      control: 'select',
    },
    leadIcon: {
      control: false,
    },
    tailIcon: {
      control: false,
    },
    badge: {
      control: false,
    },
    options: {
      control: false,
    },
  },
};

type Story = StoryObj<typeof meta>;
export default meta;

export const Default: Story = {};

export const SelectedFarOption: Story = {
  args: {
    value: 'user-24',
  },
};
