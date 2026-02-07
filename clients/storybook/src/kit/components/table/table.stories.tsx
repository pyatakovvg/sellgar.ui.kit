import type { Meta, StoryObj } from '@storybook/react-vite';

import React from 'react';
import { Table, Checkbox } from '@sellgar/kit';

import { Name } from './name';
import { Category } from './category';
import { Description } from './description';

const meta: Meta<typeof Table> = {
  title: 'Kit/Components/Table',
  component: Table,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

type Story = StoryObj<typeof meta>;
export default meta;

interface IMockItem {
  id: string;
  name: string;
  title: string;
  status: boolean;
  category: string;
  children: IMockItem[];
}

const mock = [
  {
    id: '1',
    name: 'Иван Иванов',
    title: 'Свободное описание',
    status: true,
    category: 'Категория 1',
    children: [
      {
        id: '11',
        name: 'Сергей Сергеевич',
        title: 'Свободное описание',
        status: true,
        category: 'Категория 11',
      },
    ],
  },
  {
    id: '2',
    name: 'Федор Фадеев',
    title: 'Свободное описание для чего-то другого',
    status: false,
    category: 'Категория 2',
    children: [
      {
        id: '21',
        name: 'Сергей Сергеевич',
        title: 'Свободное описание',
        status: true,
        category: 'Категория 21',
        children: [
          {
            id: '211',
            name: 'Сергей Сергеевич',
            title: 'Свободное описание',
            status: true,
            category: 'Категория 211',
          },
        ],
      },
    ],
  },
  {
    id: '3',
    name: 'Галина Васильевна',
    title: 'Свободное описание для чего-то другого',
    status: true,
    category: 'Категория 3',
    children: [],
  },
] as IMockItem[];

export const Default: Story = {
  render: () => {
    const [checked, setChecked] = React.useState<any[]>([0, 1, 2, 3]);
    const [pinLefts, setPinLefts] = React.useState<any[]>([]);
    const [pinRights, setPinRights] = React.useState<any[]>([]);
    const [select, setSelect] = React.useState(false);

    const [sort, setSort] = React.useState<'asc' | 'desc' | undefined>('asc');

    return (
      <div style={{ width: 600 }}>
        <div>
          <Checkbox
            checked={select}
            label={'использовать мульти выбор'}
            onChange={(e) => {
              setSelect(e.target.checked);
            }}
          />
        </div>
        <div>
          <Checkbox
            checked={checked.includes(0)}
            value={0}
            label={'Title 1'}
            onChange={(e) => {
              if (e.target.checked) {
                setChecked((prev) => [...prev, Number(e.target.value)]);
              } else {
                setChecked((prev) => prev.filter((item) => Number(item) !== Number(e.target.value)));
              }
            }}
          />
          <Checkbox
            checked={checked.includes(1)}
            value={1}
            label={'Title 2'}
            onChange={(e) => {
              if (e.target.checked) {
                setChecked((prev) => [...prev, Number(e.target.value)]);
              } else {
                setChecked((prev) => prev.filter((item) => Number(item) !== Number(e.target.value)));
              }
            }}
          />
          <Checkbox
            checked={checked.includes(2)}
            value={2}
            label={'Title 3'}
            onChange={(e) => {
              if (e.target.checked) {
                setChecked((prev) => [...prev, Number(e.target.value)]);
              } else {
                setChecked((prev) => prev.filter((item) => Number(item) !== Number(e.target.value)));
              }
            }}
          />
          <Checkbox
            checked={checked.includes(3)}
            value={3}
            label={'Actions'}
            onChange={(e) => {
              if (e.target.checked) {
                setChecked((prev) => [...prev, Number(e.target.value)]);
              } else {
                setChecked((prev) => prev.filter((item) => Number(item) !== Number(e.target.value)));
              }
            }}
          />
        </div>
        <div>
          <Checkbox
            checked={pinLefts.includes(0)}
            value={0}
            label={'Pin to left Title 1'}
            onChange={(e) => {
              if (e.target.checked) {
                setPinLefts((prev) => [...prev, Number(e.target.value)]);
              } else {
                setPinLefts((prev) => prev.filter((item) => Number(item) !== Number(e.target.value)));
              }
            }}
          />
          <Checkbox
            checked={pinLefts.includes(1)}
            value={1}
            label={'Pin to left Title 2'}
            onChange={(e) => {
              if (e.target.checked) {
                setPinLefts((prev) => [...prev, Number(e.target.value)]);
              } else {
                setPinLefts((prev) => prev.filter((item) => Number(item) !== Number(e.target.value)));
              }
            }}
          />
          <Checkbox
            checked={pinLefts.includes(2)}
            value={2}
            label={'Pin to left Title 3'}
            onChange={(e) => {
              if (e.target.checked) {
                setPinLefts((prev) => [...prev, Number(e.target.value)]);
              } else {
                setPinLefts((prev) => prev.filter((item) => Number(item) !== Number(e.target.value)));
              }
            }}
          />
          <Checkbox
            checked={pinLefts.includes(3)}
            value={3}
            label={'Pin to left Actions'}
            onChange={(e) => {
              if (e.target.checked) {
                setPinLefts((prev) => [...prev, Number(e.target.value)]);
              } else {
                setPinLefts((prev) => prev.filter((item) => Number(item) !== Number(e.target.value)));
              }
            }}
          />
        </div>
        <div>
          <Checkbox
            checked={pinRights.includes(0)}
            value={0}
            label={'Pin to right Title 1'}
            onChange={(e) => {
              if (e.target.checked) {
                setPinRights((prev) => [...prev, Number(e.target.value)]);
              } else {
                setPinRights((prev) => prev.filter((item) => Number(item) !== Number(e.target.value)));
              }
            }}
          />
          <Checkbox
            checked={pinRights.includes(1)}
            value={1}
            label={'Pin to right Title 2'}
            onChange={(e) => {
              if (e.target.checked) {
                setPinRights((prev) => [...prev, Number(e.target.value)]);
              } else {
                setPinRights((prev) => prev.filter((item) => Number(item) !== Number(e.target.value)));
              }
            }}
          />
          <Checkbox
            checked={pinRights.includes(2)}
            value={2}
            label={'Pin to right Title 3'}
            onChange={(e) => {
              if (e.target.checked) {
                setPinRights((prev) => [...prev, Number(e.target.value)]);
              } else {
                setPinRights((prev) => prev.filter((item) => Number(item) !== Number(e.target.value)));
              }
            }}
          />
          <Checkbox
            checked={pinRights.includes(3)}
            value={3}
            label={'Pin to right Actions'}
            onChange={(e) => {
              if (e.target.checked) {
                setPinRights((prev) => [...prev, Number(e.target.value)]);
              } else {
                setPinRights((prev) => prev.filter((item) => Number(item) !== Number(e.target.value)));
              }
            }}
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', flex: '1 0 auto' }}>
          <Table<IMockItem>
            data={{ nodes: mock }}
            tree={{
              isUse: true,
              accessor: 'children',
            }}
            select={{ isUse: select, onSelect: (items) => console.log(123, items) }}
          >
            {checked.includes(0) && (
              <Table.Column
                width={400}
                pinLeft={pinLefts.includes(0)}
                pinRight={pinRights.includes(0)}
                sort={{
                  directionDefault: sort,
                  onToggle: (direction) => {
                    setSort(direction);
                    console.log(123, 'sort Title 1', direction);
                  },
                }}
              >
                <Table.Head label={'Title 1'} />
                <Table.Cell>
                  <Name />
                </Table.Cell>
              </Table.Column>
            )}
            {checked.includes(1) && (
              <Table.Column pinLeft={pinLefts.includes(1)} pinRight={pinRights.includes(1)}>
                <Table.Head label={'Title 2'} />
                <Table.Cell>
                  <Category />
                </Table.Cell>
              </Table.Column>
            )}
            {checked.includes(2) && (
              <Table.Column pinLeft={pinLefts.includes(2)} pinRight={pinRights.includes(2)}>
                <Table.Head label={'Title 3'} />
                <Table.Cell>
                  <Description />
                </Table.Cell>
              </Table.Column>
            )}
            {checked.includes(3) && (
              <Table.Column width={100} pinLeft={pinLefts.includes(3)} pinRight={pinRights.includes(3)}>
                <Table.Head label={'Actions'} />
                <Table.Cell>
                  <p>1</p>
                </Table.Cell>
              </Table.Column>
            )}
          </Table>
        </div>
      </div>
    );
  },
};
