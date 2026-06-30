import React from 'react';

import { MenuItem, Table, useCellData } from '@sellgar/kit';
import { EyeOffLineIcon, PushpinLineIcon } from '@sellgar/kit/icons';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof Table> = {
  title: 'Kit/Data/Table',
  component: Table,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

interface PaymentRow {
  id: string;
  merchant: string;
  terminal: string;
  amount: number;
  status: 'new' | 'paid' | 'declined';
  children?: PaymentRow[];
}

const rows: PaymentRow[] = [
  {
    id: 'payment-1',
    merchant: 'Acme Market',
    terminal: 'T-1024',
    amount: 12500,
    status: 'paid',
  },
  {
    id: 'payment-2',
    merchant: 'North Coffee',
    terminal: 'T-2048',
    amount: 3400,
    status: 'new',
  },
  {
    id: 'payment-3',
    merchant: 'Metro Books',
    terminal: 'T-4096',
    amount: 980,
    status: 'declined',
  },
];

const treeRows: PaymentRow[] = [
  {
    id: 'group-1',
    merchant: 'Retail group',
    terminal: '3 terminals',
    amount: 16880,
    status: 'paid',
    children: [rows[0], rows[2]],
  },
  {
    id: 'group-2',
    merchant: 'Food group',
    terminal: '1 terminal',
    amount: 3400,
    status: 'new',
    children: [rows[1]],
  },
];

const infiniteRows: PaymentRow[] = Array.from({ length: 36 }, (_, index) => {
  const id = String(index + 1);

  return {
    id: `payment-${id}`,
    merchant: `Merchant ${id}`,
    terminal: `T-${1000 + index}`,
    amount: (index + 1) * 375,
    status: index % 3 === 0 ? 'declined' : index % 2 === 0 ? 'paid' : 'new',
  };
});

const formatAmount = (value: number): string => {
  return new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    maximumFractionDigits: 0,
  }).format(value);
};

const MerchantCell = () => {
  const { data, deps } = useCellData<PaymentRow>();

  return (
    <div style={{ display: 'grid', gap: 2, paddingLeft: deps * 16 }}>
      <strong>{data.merchant}</strong>
      <span style={{ color: 'var(--text-base-secondary)' }}>{data.id}</span>
    </div>
  );
};

type SortColumnId = 'merchant' | 'amount' | 'status';

const sortRows = (columnId: SortColumnId, direction: 'asc' | 'desc'): PaymentRow[] => {
  const multiplier = direction === 'asc' ? 1 : -1;

  return [...rows].sort((left, right) => {
    if (columnId === 'amount') return (left.amount - right.amount) * multiplier;

    return left[columnId].localeCompare(right[columnId]) * multiplier;
  });
};

const tableSizes = ['lg', 'md', 'sm'] as const;

export const RuntimeMvp: Story = {
  render: () => (
    <div style={{ width: 720 }}>
      <Table data={{ nodes: rows }}>
        {({ Column }) => (
          <>
            <Column width="minmax(220px, 1fr)">
              {({ Head, Cell }) => (
                <>
                  <Head label="Merchant" />
                  <Cell render={({ row }) => row.merchant} />
                </>
              )}
            </Column>

            <Column width={140}>
              {({ Head, Cell }) => (
                <>
                  <Head label="Terminal" />
                  <Cell render={({ row }) => row.terminal} />
                </>
              )}
            </Column>

            <Column align="right" width={160}>
              {({ Head, Cell }) => (
                <>
                  <Head label="Amount" />
                  <Cell render={({ row }) => formatAmount(row.amount)} />
                </>
              )}
            </Column>

            <Column width={140}>
              {({ Head, Cell }) => (
                <>
                  <Head label="Status" />
                  <Cell render={({ row }) => row.status} />
                </>
              )}
            </Column>
          </>
        )}
      </Table>
    </div>
  ),
};

export const CustomCells: Story = {
  render: () => (
    <div style={{ width: 720 }}>
      <Table data={{ nodes: rows }}>
        {({ Column }) => (
          <>
            <Column width="minmax(240px, 1fr)">
              {({ Head, Cell }) => (
                <>
                  <Head label="Merchant" />
                  <Cell>
                    <MerchantCell />
                  </Cell>
                </>
              )}
            </Column>

            <Column width={140}>
              {({ Head, Cell }) => (
                <>
                  <Head label="Terminal" />
                  <Cell render={({ row }) => row.terminal} />
                </>
              )}
            </Column>

            <Column align="right" width={160}>
              {({ Head, Cell }) => (
                <>
                  <Head label="Amount" />
                  <Cell render={({ row }) => formatAmount(row.amount)} />
                </>
              )}
            </Column>

            <Column width={140}>
              {({ Head, Cell }) => (
                <>
                  <Head label="Status" />
                  <Cell render={({ row }) => row.status} />
                </>
              )}
            </Column>
          </>
        )}
      </Table>
    </div>
  ),
};

export const ColumnLayout: Story = {
  render: () => (
    <div style={{ width: 720 }}>
      <Table data={{ nodes: rows }}>
        {({ Column }) => (
          <>
            <Column width="minmax(240px, 1fr)" order={10}>
              {({ Head, Cell }) => (
                <>
                  <Head label="Merchant" />
                  <Cell render={({ row }) => row.merchant} />
                </>
              )}
            </Column>

            <Column width={140} visible={false}>
              {({ Head, Cell }) => (
                <>
                  <Head label="Terminal" />
                  <Cell render={({ row }) => row.terminal} />
                </>
              )}
            </Column>

            <Column align="right" width={160} order={20}>
              {({ Head, Cell }) => (
                <>
                  <Head label="Amount" />
                  <Cell render={({ row }) => formatAmount(row.amount)} />
                </>
              )}
            </Column>

            <Column width={140} order={0}>
              {({ Head, Cell }) => (
                <>
                  <Head label="Status" />
                  <Cell render={({ row }) => row.status} />
                </>
              )}
            </Column>
          </>
        )}
      </Table>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 16, width: 720 }}>
      {tableSizes.map((size) => (
        <div key={size} style={{ display: 'grid', gap: 8 }}>
          <p style={{ margin: 0 }}>{size}</p>

          <Table size={size} data={{ nodes: rows.slice(0, 2) }}>
            {({ Column }) => (
              <>
                <Column width="minmax(220px, 1fr)">
                  {({ Head, Cell }) => (
                    <>
                      <Head label="Merchant" />
                      <Cell render={({ row }) => row.merchant} />
                    </>
                  )}
                </Column>

                <Column width={140}>
                  {({ Head, Cell }) => (
                    <>
                      <Head label="Terminal" />
                      <Cell render={({ row }) => row.terminal} />
                    </>
                  )}
                </Column>

                <Column align="right" width={160}>
                  {({ Head, Cell }) => (
                    <>
                      <Head label="Amount" />
                      <Cell render={({ row }) => formatAmount(row.amount)} />
                    </>
                  )}
                </Column>

                <Column width={140}>
                  {({ Head, Cell }) => (
                    <>
                      <Head label="Status" />
                      <Cell render={({ row }) => row.status} />
                    </>
                  )}
                </Column>
              </>
            )}
          </Table>
        </div>
      ))}
    </div>
  ),
};

export const SecondaryStyle: Story = {
  render: () => (
    <div style={{ width: 720 }}>
      <Table style="secondary" data={{ nodes: rows }}>
        {({ Column }) => (
          <>
            <Column
              width="minmax(220px, 1fr)"
              sort={{
                onToggle: () => undefined,
              }}
            >
              {({ Head, Cell }) => (
                <>
                  <Head label="Merchant" />
                  <Cell render={({ row }) => row.merchant} />
                </>
              )}
            </Column>

            <Column width={140}>
              {({ Head, Cell }) => (
                <>
                  <Head label="Terminal" />
                  <Cell render={({ row }) => row.terminal} />
                </>
              )}
            </Column>

            <Column align="right" width={160}>
              {({ Head, Cell }) => (
                <>
                  <Head label="Amount" />
                  <Cell render={({ row }) => formatAmount(row.amount)} />
                </>
              )}
            </Column>

            <Column width={140}>
              {({ Head, Cell }) => (
                <>
                  <Head label="Status" />
                  <Cell render={({ row }) => row.status} />
                </>
              )}
            </Column>
          </>
        )}
      </Table>
    </div>
  ),
};

const SelectionExample = () => {
  const [selectedRows, setSelectedRows] = React.useState<PaymentRow[]>([]);

  return (
    <div style={{ width: 720 }}>
      <Table
        data={{ nodes: rows }}
        select={{
          isUse: true,
          onSelect: setSelectedRows,
        }}
      >
        {({ Column }) => (
          <>
            <Column width="minmax(220px, 1fr)">
              {({ Head, Cell }) => (
                <>
                  <Head label="Merchant" />
                  <Cell render={({ row }) => row.merchant} />
                </>
              )}
            </Column>

            <Column width={140}>
              {({ Head, Cell }) => (
                <>
                  <Head label="Terminal" />
                  <Cell render={({ row }) => row.terminal} />
                </>
              )}
            </Column>

            <Column align="right" width={160}>
              {({ Head, Cell }) => (
                <>
                  <Head label="Amount" />
                  <Cell render={({ row }) => formatAmount(row.amount)} />
                </>
              )}
            </Column>

            <Column width={140}>
              {({ Head, Cell }) => (
                <>
                  <Head label="Status" />
                  <Cell
                    render={({ row, rowSelected }) =>
                      `${row.status}${rowSelected ? ` selected ${selectedRows.length}` : ''}`
                    }
                  />
                </>
              )}
            </Column>
          </>
        )}
      </Table>
    </div>
  );
};

export const RowSelection: Story = {
  render: () => <SelectionExample />,
};

const RowEventsExample = () => {
  const [selectedRows, setSelectedRows] = React.useState<PaymentRow[]>([]);
  const [lastEvent, setLastEvent] = React.useState('No row events');

  return (
    <div style={{ width: 720 }}>
      <p style={{ margin: '0 0 12px' }}>{lastEvent}</p>

      <Table
        data={{ nodes: rows }}
        select={{
          isUse: true,
          onSelect: setSelectedRows,
        }}
        row={{
          handlers: {
            click: ({ row, trigger }) => {
              setLastEvent(`${trigger}: ${row.id} (${row.merchant}), selected ${selectedRows.length}`);
            },
            doubleClick: ({ row, trigger }) => {
              setLastEvent(`${trigger}: ${row.id} (${row.merchant}), selected ${selectedRows.length}`);
            },
            contextMenu: ({ row, trigger, nativeEvent }) => {
              nativeEvent.preventDefault();
              setLastEvent(`${trigger}: ${row.id} (${row.merchant}), selected ${selectedRows.length}`);
            },
          },
        }}
      >
        {({ Column }) => (
          <>
            <Column width="minmax(220px, 1fr)">
              {({ Head, Cell }) => (
                <>
                  <Head label="Merchant" />
                  <Cell render={({ row }) => row.merchant} />
                </>
              )}
            </Column>

            <Column width={140}>
              {({ Head, Cell }) => (
                <>
                  <Head label="Terminal" />
                  <Cell render={({ row }) => row.terminal} />
                </>
              )}
            </Column>

            <Column align="right" width={160}>
              {({ Head, Cell }) => (
                <>
                  <Head label="Amount" />
                  <Cell render={({ row }) => formatAmount(row.amount)} />
                </>
              )}
            </Column>

            <Column width={140}>
              {({ Head, Cell }) => (
                <>
                  <Head label="Status" />
                  <Cell render={({ row }) => row.status} />
                </>
              )}
            </Column>
          </>
        )}
      </Table>
    </div>
  );
};

export const RowEvents: Story = {
  render: () => <RowEventsExample />,
};

export const EmptyState: Story = {
  render: () => (
    <div style={{ width: 720 }}>
      <Table data={{ nodes: [] as PaymentRow[] }}>
        {({ Column, Empty }) => (
          <>
            <Column width="minmax(220px, 1fr)">
              {({ Head, Cell }) => (
                <>
                  <Head label="Merchant" />
                  <Cell render={({ row }) => row.merchant} />
                </>
              )}
            </Column>

            <Column width={140}>
              {({ Head, Cell }) => (
                <>
                  <Head label="Terminal" />
                  <Cell render={({ row }) => row.terminal} />
                </>
              )}
            </Column>

            <Column align="right" width={160}>
              {({ Head, Cell }) => (
                <>
                  <Head label="Amount" />
                  <Cell render={({ row }) => formatAmount(row.amount)} />
                </>
              )}
            </Column>

            <Column width={140}>
              {({ Head, Cell }) => (
                <>
                  <Head label="Status" />
                  <Cell render={({ row }) => row.status} />
                </>
              )}
            </Column>

            <Empty>No payments found</Empty>
          </>
        )}
      </Table>
    </div>
  ),
};

const ExternalSortExample = () => {
  const [tableRows, setTableRows] = React.useState<PaymentRow[]>(() => sortRows('merchant', 'desc'));
  const [sortState, setSortState] = React.useState('merchant: desc');

  const handleSortToggle = React.useCallback(
    (columnId: SortColumnId) =>
      (direction: 'asc' | 'desc' = 'asc') => {
        setTableRows(sortRows(columnId, direction));
        setSortState(`${columnId}: ${direction}`);
      },
    [],
  );

  const handleSortReset = React.useCallback((columnId: SortColumnId) => {
    setSortState((prevState) => `${prevState}; reset ${columnId}`);
  }, []);

  return (
    <div style={{ width: 720 }}>
      <p style={{ margin: '0 0 12px' }}>{sortState}</p>

      <Table data={{ nodes: tableRows }}>
        {({ Column }) => (
          <>
            <Column
              width="minmax(220px, 1fr)"
              sort={{
                directionDefault: 'desc',
                onToggle: handleSortToggle('merchant'),
                onReset: () => handleSortReset('merchant'),
              }}
            >
              {({ Head, Cell }) => (
                <>
                  <Head label="Merchant" />
                  <Cell render={({ row }) => <p>{row.merchant}</p>} />
                </>
              )}
            </Column>

            <Column width={140}>
              {({ Head, Cell }) => (
                <>
                  <Head label="Terminal" />
                  <Cell render={({ row }) => row.terminal} />
                </>
              )}
            </Column>

            <Column
              align="right"
              width={160}
              sort={{
                onToggle: handleSortToggle('amount'),
                onReset: () => handleSortReset('amount'),
              }}
            >
              {({ Head, Cell }) => (
                <>
                  <Head label="Amount" />
                  <Cell render={({ row }) => formatAmount(row.amount)} />
                </>
              )}
            </Column>

            <Column
              width={140}
              sort={{
                onToggle: handleSortToggle('status'),
                onReset: () => handleSortReset('status'),
              }}
            >
              {({ Head, Cell }) => (
                <>
                  <Head label="Status" />
                  <Cell render={({ row }) => row.status} />
                </>
              )}
            </Column>
          </>
        )}
      </Table>
    </div>
  );
};

export const ExternalSort: Story = {
  render: () => <ExternalSortExample />,
};

export const RowExpansion: Story = {
  render: () => (
    <div style={{ width: 720 }}>
      <Table data={{ nodes: rows }}>
        {({ Column, Expand }) => (
          <>
            <Column width="minmax(220px, 1fr)">
              {({ Head, Cell }) => (
                <>
                  <Head label="Merchant" />
                  <Cell
                    render={({ row, ExpandTrigger }) => (
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <ExpandTrigger>
                          {({ expanded }) => (
                            <span style={{ display: 'inline-block', width: 16 }}>{expanded ? '-' : '+'}</span>
                          )}
                        </ExpandTrigger>
                        <span>{row.merchant}</span>
                      </div>
                    )}
                  />
                </>
              )}
            </Column>

            <Column width={140}>
              {({ Head, Cell }) => (
                <>
                  <Head label="Terminal" />
                  <Cell render={({ row }) => row.terminal} />
                </>
              )}
            </Column>

            <Column align="right" width={160}>
              {({ Head, Cell }) => (
                <>
                  <Head label="Amount" />
                  <Cell render={({ row }) => formatAmount(row.amount)} />
                </>
              )}
            </Column>

            <Column width={140}>
              {({ Head, Cell }) => (
                <>
                  <Head label="Status" />
                  <Cell render={({ row }) => row.status} />
                </>
              )}
            </Column>

            <Expand
              render={({ row }) => (
                <div>
                  <strong>{row.merchant}</strong>
                  <p style={{ margin: '8px 0 0' }}>
                    Terminal {row.terminal}, status {row.status}, amount {formatAmount(row.amount)}
                  </p>
                </div>
              )}
            />
          </>
        )}
      </Table>
    </div>
  ),
};

export const RowExpansionOnDoubleClick: Story = {
  render: () => (
    <div style={{ width: 720 }}>
      <Table
        data={{ nodes: rows }}
        row={{
          handlers: {
            doubleClick: ({ context }) => {
              context.expansion?.toggle();
            },
          },
        }}
      >
        {({ Column, Expand }) => (
          <>
            <Column width="minmax(220px, 1fr)">
              {({ Head, Cell }) => (
                <>
                  <Head label="Merchant" />
                  <Cell
                    render={({ row, ExpandTrigger }) => (
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <ExpandTrigger>
                          {({ expanded }) => (
                            <span style={{ display: 'inline-block', width: 16 }}>{expanded ? '-' : '+'}</span>
                          )}
                        </ExpandTrigger>
                        <span>{row.merchant}</span>
                      </div>
                    )}
                  />
                </>
              )}
            </Column>

            <Column width={140}>
              {({ Head, Cell }) => (
                <>
                  <Head label="Terminal" />
                  <Cell render={({ row }) => row.terminal} />
                </>
              )}
            </Column>

            <Column align="right" width={160}>
              {({ Head, Cell }) => (
                <>
                  <Head label="Amount" />
                  <Cell render={({ row }) => formatAmount(row.amount)} />
                </>
              )}
            </Column>

            <Column width={140}>
              {({ Head, Cell }) => (
                <>
                  <Head label="Status" />
                  <Cell render={({ row }) => row.status} />
                </>
              )}
            </Column>

            <Expand
              render={({ row }) => (
                <div>
                  <strong>{row.merchant}</strong>
                  <p style={{ margin: '8px 0 0' }}>
                    Terminal {row.terminal}, status {row.status}, amount {formatAmount(row.amount)}
                  </p>
                </div>
              )}
            />
          </>
        )}
      </Table>
    </div>
  ),
};

export const RowExpansionDefaultExpanded: Story = {
  render: () => (
    <div style={{ width: 720 }}>
      <Table data={{ nodes: rows }}>
        {({ Column, Expand }) => (
          <>
            <Column width="minmax(220px, 1fr)">
              {({ Head, Cell }) => (
                <>
                  <Head label="Merchant" />
                  <Cell
                    render={({ row, ExpandTrigger }) => (
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <ExpandTrigger>
                          {({ expanded }) => (
                            <span style={{ display: 'inline-block', width: 16 }}>{expanded ? '-' : '+'}</span>
                          )}
                        </ExpandTrigger>
                        <span>{row.merchant}</span>
                      </div>
                    )}
                  />
                </>
              )}
            </Column>

            <Column width={140}>
              {({ Head, Cell }) => (
                <>
                  <Head label="Terminal" />
                  <Cell render={({ row }) => row.terminal} />
                </>
              )}
            </Column>

            <Column align="right" width={160}>
              {({ Head, Cell }) => (
                <>
                  <Head label="Amount" />
                  <Cell render={({ row }) => formatAmount(row.amount)} />
                </>
              )}
            </Column>

            <Column width={140}>
              {({ Head, Cell }) => (
                <>
                  <Head label="Status" />
                  <Cell render={({ row }) => row.status} />
                </>
              )}
            </Column>

            <Expand
              defaultExpanded={true}
              render={({ row }) => (
                <div>
                  <strong>{row.merchant}</strong>
                  <p style={{ margin: '8px 0 0' }}>
                    Terminal {row.terminal}, status {row.status}, amount {formatAmount(row.amount)}
                  </p>
                </div>
              )}
            />
          </>
        )}
      </Table>
    </div>
  ),
};

export const EmbeddedSurface: Story = {
  render: () => (
    <div style={{ width: 720 }}>
      <Table data={{ nodes: rows }}>
        {({ Column, Expand }) => (
          <>
            <Column width="minmax(220px, 1fr)">
              {({ Head, Cell }) => (
                <>
                  <Head label="Merchant" />
                  <Cell
                    render={({ row, ExpandTrigger }) => (
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <ExpandTrigger>
                          {({ expanded }) => (
                            <span style={{ display: 'inline-block', width: 16 }}>{expanded ? '-' : '+'}</span>
                          )}
                        </ExpandTrigger>
                        <span>{row.merchant}</span>
                      </div>
                    )}
                  />
                </>
              )}
            </Column>

            <Column width={140}>
              {({ Head, Cell }) => (
                <>
                  <Head label="Terminal" />
                  <Cell render={({ row }) => row.terminal} />
                </>
              )}
            </Column>

            <Column align="right" width={160}>
              {({ Head, Cell }) => (
                <>
                  <Head label="Amount" />
                  <Cell render={({ row }) => formatAmount(row.amount)} />
                </>
              )}
            </Column>

            <Column width={140}>
              {({ Head, Cell }) => (
                <>
                  <Head label="Status" />
                  <Cell render={({ row }) => row.status} />
                </>
              )}
            </Column>

            <Expand
              render={({ row }) => (
                <Table
                  surface="embedded"
                  style={'secondary'}
                  size={'sm'}
                  layout={{
                    scroll: 'external',
                    stickyHeader: false,
                  }}
                  data={{ nodes: [row] }}
                >
                  {({ Column }) => (
                    <>
                      <Column width="minmax(220px, 1fr)">
                        {({ Head, Cell }) => (
                          <>
                            <Head label="Payment" />
                            <Cell render={({ row }) => row.id} />
                          </>
                        )}
                      </Column>

                      <Column width={140}>
                        {({ Head, Cell }) => (
                          <>
                            <Head label="Terminal" />
                            <Cell render={({ row }) => row.terminal} />
                          </>
                        )}
                      </Column>

                      <Column align="right" width={160}>
                        {({ Head, Cell }) => (
                          <>
                            <Head label="Amount" />
                            <Cell render={({ row }) => formatAmount(row.amount)} />
                          </>
                        )}
                      </Column>
                    </>
                  )}
                </Table>
              )}
            />
          </>
        )}
      </Table>
    </div>
  ),
};

export const IntegratedLayout: Story = {
  render: () => (
    <div
      style={{
        width: 720,
        height: 360,
        overflow: 'auto',
        border: '1px solid var(--border-base-divider)',
        borderRadius: 'var(--measurements-radius-lg)',
      }}
    >
      <div
        style={{
          // position: 'sticky',
          // top: 0,
          // zIndex: 40,
          padding: 12,
          background: 'var(--background-surface-default)',
          borderBottom: '1px solid var(--border-base-divider)',
        }}
      >
        Smart layout header
      </div>

      <Table
        data={{ nodes: infiniteRows }}
        layout={{
          scroll: 'external',
          stickyHeader: { top: '0px' },
        }}
      >
        {({ Column }) => (
          <>
            <Column width="minmax(260px, 1fr)" pinLeft>
              {({ Head, Cell }) => (
                <>
                  <Head label="Merchant" />
                  <Cell render={({ row }) => row.merchant} />
                </>
              )}
            </Column>

            <Column width={180}>
              {({ Head, Cell }) => (
                <>
                  <Head label="Terminal" />
                  <Cell render={({ row }) => row.terminal} />
                </>
              )}
            </Column>

            <Column align="right" width={180}>
              {({ Head, Cell }) => (
                <>
                  <Head label="Amount" />
                  <Cell render={({ row }) => formatAmount(row.amount)} />
                </>
              )}
            </Column>

            <Column width={150} pinRight>
              {({ Head, Cell }) => (
                <>
                  <Head label="Status" />
                  <Cell render={({ row }) => row.status} />
                </>
              )}
            </Column>
          </>
        )}
      </Table>
    </div>
  ),
};

export const Tree: Story = {
  render: () => (
    <div style={{ width: 720 }}>
      <Table data={{ nodes: treeRows }} tree={{ isUse: true, accessor: 'children' }}>
        {({ Column }) => (
          <>
            <Column width="minmax(220px, 1fr)">
              {({ Head, Cell }) => (
                <>
                  <Head label="Merchant" />
                  <Cell
                    render={({ row, node }) => <span style={{ paddingLeft: node.depth * 16 }}>{row.merchant}</span>}
                  />
                </>
              )}
            </Column>

            <Column width={140}>
              {({ Head, Cell }) => (
                <>
                  <Head label="Terminal" />
                  <Cell render={({ row }) => row.terminal} />
                </>
              )}
            </Column>

            <Column align="right" width={160}>
              {({ Head, Cell }) => (
                <>
                  <Head label="Amount" />
                  <Cell render={({ row }) => formatAmount(row.amount)} />
                </>
              )}
            </Column>

            <Column width={140}>
              {({ Head, Cell }) => (
                <>
                  <Head label="Status" />
                  <Cell render={({ row }) => row.status} />
                </>
              )}
            </Column>
          </>
        )}
      </Table>
    </div>
  ),
};

const SelectionTreeExample = () => {
  const [selectedRows, setSelectedRows] = React.useState<PaymentRow[]>([]);

  return (
    <div style={{ width: 720 }}>
      <p style={{ margin: '0 0 12px' }}>Selected rows: {selectedRows.map((row) => row.id).join(', ') || 'none'}</p>

      <Table
        data={{ nodes: treeRows }}
        select={{
          isUse: true,
          onSelect: setSelectedRows,
        }}
        tree={{
          isUse: true,
          accessor: 'children',
          defaultExpanded: true,
        }}
      >
        {({ Column }) => (
          <>
            <Column width="minmax(220px, 1fr)">
              {({ Head, Cell }) => (
                <>
                  <Head label="Merchant" />
                  <Cell>
                    <MerchantCell />
                  </Cell>
                </>
              )}
            </Column>

            <Column width={140}>
              {({ Head, Cell }) => (
                <>
                  <Head label="Terminal" />
                  <Cell render={({ row }) => row.terminal} />
                </>
              )}
            </Column>

            <Column align="right" width={160}>
              {({ Head, Cell }) => (
                <>
                  <Head label="Amount" />
                  <Cell render={({ row }) => formatAmount(row.amount)} />
                </>
              )}
            </Column>

            <Column width={140}>
              {({ Head, Cell }) => (
                <>
                  <Head label="Status" />
                  <Cell render={({ row, rowSelected }) => `${row.status}${rowSelected ? ' selected' : ''}`} />
                </>
              )}
            </Column>
          </>
        )}
      </Table>
    </div>
  );
};

export const SelectionTree: Story = {
  render: () => <SelectionTreeExample />,
};

export const PinnedColumns: Story = {
  render: () => (
    <div style={{ width: 560 }}>
      <Table
        data={{ nodes: infiniteRows.slice(0, 10) }}
        select={{
          isUse: true,
          onSelect: () => undefined,
        }}
      >
        {({ Column }) => (
          <>
            <Column width="minmax(260px, 1fr)" pinLeft>
              {({ Head, Cell }) => (
                <>
                  <Head label="Merchant" />
                  <Cell render={({ row }) => row.merchant} />
                </>
              )}
            </Column>

            <Column width={180}>
              {({ Head, Cell }) => (
                <>
                  <Head label="Terminal" />
                  <Cell render={({ row }) => row.terminal} />
                </>
              )}
            </Column>

            <Column align="right" width={180}>
              {({ Head, Cell }) => (
                <>
                  <Head label="Amount" />
                  <Cell render={({ row }) => formatAmount(row.amount)} />
                </>
              )}
            </Column>

            <Column width={180}>
              {({ Head, Cell }) => (
                <>
                  <Head label="Payment" />
                  <Cell render={({ row }) => row.id} />
                </>
              )}
            </Column>

            <Column width={150} pinRight>
              {({ Head, Cell }) => (
                <>
                  <Head label="Status" />
                  <Cell render={({ row }) => row.status} />
                </>
              )}
            </Column>
          </>
        )}
      </Table>
    </div>
  ),
};

const ColumnActionsExample = () => {
  const [isMerchantPinned, setIsMerchantPinned] = React.useState(false);
  const [isAmountPinned, setIsAmountPinned] = React.useState(false);
  const [isTerminalVisible, setIsTerminalVisible] = React.useState(true);
  const [sortState, setSortState] = React.useState('no sort');

  return (
    <div style={{ width: 860 }}>
      <button type="button" onClick={() => setIsTerminalVisible(true)}>
        Show terminal column
      </button>

      <p style={{ margin: '8px 0 0' }}>{sortState}</p>

      <div style={{ height: 12 }} />

      <Table data={{ nodes: rows }}>
        {({ Column }) => (
          <>
            <Column
              width="minmax(260px, 1fr)"
              pinLeft={isMerchantPinned}
              sort={{
                onToggle: (direction) => setSortState(`merchant: ${direction}`),
                onReset: () => setSortState('merchant: reset'),
              }}
            >
              {({ Head, Actions, Cell }) => (
                <>
                  <Head label="Merchant" />

                  <Actions>
                    {({ Action }) => (
                      <Action
                        state={{ pinned: isMerchantPinned }}
                        onAction={() => setIsMerchantPinned((value) => !value)}
                      >
                        {({ state }) => (
                          <MenuItem
                            leadIcon={<PushpinLineIcon />}
                            caption={state.pinned ? 'Открепить колонку' : 'Закрепить колонку'}
                          />
                        )}
                      </Action>
                    )}
                  </Actions>

                  <Cell render={({ row }) => row.merchant} />
                </>
              )}
            </Column>

            <Column width={180} visible={isTerminalVisible}>
              {({ Head, Actions, Cell }) => (
                <>
                  <Head label="Terminal" />

                  <Actions>
                    {({ Action }) => (
                      <Action state={{ visible: isTerminalVisible }} onAction={() => setIsTerminalVisible(false)}>
                        {({ state }) => (
                          <MenuItem
                            leadIcon={<EyeOffLineIcon />}
                            caption={state.visible ? 'Скрыть колонку' : 'Показать колонку'}
                          />
                        )}
                      </Action>
                    )}
                  </Actions>

                  <Cell render={({ row }) => row.terminal} />
                </>
              )}
            </Column>

            <Column
              align="right"
              width={180}
              pinRight={isAmountPinned}
              sort={{
                onToggle: (direction) => setSortState(`amount: ${direction}`),
                onReset: () => setSortState('amount: reset'),
              }}
            >
              {({ Head, Actions, Cell }) => (
                <>
                  <Head label="Amount" />

                  <Actions>
                    {({ Action }) => (
                      <Action state={{ pinned: isAmountPinned }} onAction={() => setIsAmountPinned((value) => !value)}>
                        {({ state }) => (
                          <MenuItem
                            leadIcon={<PushpinLineIcon />}
                            caption={state.pinned ? 'Открепить справа' : 'Закрепить справа'}
                          />
                        )}
                      </Action>
                    )}
                  </Actions>

                  <Cell render={({ row }) => formatAmount(row.amount)} />
                </>
              )}
            </Column>

            <Column width={150}>
              {({ Head, Cell }) => (
                <>
                  <Head label="Status" />
                  <Cell render={({ row }) => row.status} />
                </>
              )}
            </Column>
          </>
        )}
      </Table>
    </div>
  );
};

export const ColumnActions: Story = {
  render: () => <ColumnActionsExample />,
};

const InfiniteScrollTriggerExample = () => {
  const batchSize = 8;
  const [visibleCount, setVisibleCount] = React.useState(batchSize);
  const [isLoading, setLoading] = React.useState(false);

  const visibleRows = React.useMemo(() => infiniteRows.slice(0, visibleCount), [visibleCount]);
  const hasMore = visibleCount < infiniteRows.length;

  return (
    <div style={{ width: 720 }}>
      <p style={{ margin: '0 0 12px' }}>
        Loaded {visibleRows.length} / {infiniteRows.length}
        {isLoading ? ' (loading...)' : hasMore ? '' : ' (complete)'}
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', height: 300 }}>
        <Table
          data={{ nodes: visibleRows }}
          lastRowTrigger={{
            onLastRowVisible: () => {
              if (!hasMore || isLoading) return;

              setLoading(true);
              setTimeout(() => {
                setVisibleCount((count) => Math.min(count + batchSize, infiniteRows.length));
                setLoading(false);
              }, 450);
            },
          }}
        >
          {({ Column }) => (
            <>
              <Column width="minmax(220px, 1fr)">
                {({ Head, Cell }) => (
                  <>
                    <Head label="Merchant" />
                    <Cell render={({ row }) => row.merchant} />
                  </>
                )}
              </Column>

              <Column width={140}>
                {({ Head, Cell }) => (
                  <>
                    <Head label="Terminal" />
                    <Cell render={({ row }) => row.terminal} />
                  </>
                )}
              </Column>

              <Column align="right" width={160}>
                {({ Head, Cell }) => (
                  <>
                    <Head label="Amount" />
                    <Cell render={({ row }) => formatAmount(row.amount)} />
                  </>
                )}
              </Column>

              <Column width={140}>
                {({ Head, Cell }) => (
                  <>
                    <Head label="Status" />
                    <Cell render={({ row }) => row.status} />
                  </>
                )}
              </Column>
            </>
          )}
        </Table>
      </div>
    </div>
  );
};

export const InfiniteScrollTrigger: Story = {
  render: () => <InfiniteScrollTriggerExample />,
};
