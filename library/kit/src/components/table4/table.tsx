import React from 'react';

import { Scrollbar } from '../wrappers';

import { Cell } from './configuration/cell';
import { Head } from './configuration/head';
import { Column } from './configuration/column';

import { THead } from './components/thead';
import { TBody } from './components/tbody';

import { createContext as createTableContext } from './table.context.ts';
import { TreeProvider, compareColumnsConfig as compareTreeColumnsConfig } from './feature/tree';
import { SelectProvider, compareColumnsConfig as compareSelectColumnsConfig } from './feature/select';

import { useGetColumnsWidth } from './configuration/get-columns-width.hook.ts';
import { useCreateTableGridTemplate } from './configuration/create-grid-template.hook.ts';

import { createDataNodes } from './configuration/create-data-nodes.ts';
import { createColumnConfig } from './configuration/create-columns-config.ts';

import s from './default.module.scss';

export interface INode {
  id: string | number;
  nodes?: INode[];
  [prop: string]: any;
}

export interface IData<T> {
  nodes: T[];
}

interface ITreeProps<T> {
  isUse: boolean;
  accessor: keyof T;
}

interface ISelectProps<T> {
  isUse: boolean;
  onSelect(nodes: T[]): void;
}

interface IProps<T extends INode> {
  data: IData<T>;
  tree?: ITreeProps<T>;
  select?: ISelectProps<T>;
}

export const TableComponent = <T extends INode>(props: React.PropsWithChildren<IProps<T>>) => {
  const tableRef = React.useRef<HTMLTableElement>(null);

  const columns = React.useMemo(() => {
    let columns = createColumnConfig<T>(props.children);

    if (props.tree?.isUse) {
      columns = compareTreeColumnsConfig(columns);
    }

    if (props.select?.isUse) {
      columns = compareSelectColumnsConfig(columns);
    }

    return columns;
  }, [props.children, props.select]);

  const data = React.useMemo(() => createDataNodes<T>(props.data), [props.data]);

  const columnsWidth = useGetColumnsWidth<T>(tableRef, columns);
  const gridTemplateColumns = useCreateTableGridTemplate<T>(columns);

  const tableContext = createTableContext<T>();

  return (
    <Scrollbar
      className={s.wrapper}
      contentStyle={{
        position: 'relative',
        display: 'grid',
        gridTemplateColumns,
        overflow: 'auto',
      }}
    >
      <tableContext.Provider value={{ data, columns, columnsWidth }}>
        <TreeProvider>
          <SelectProvider<T> onSelect={(nodes) => props.select?.onSelect(nodes)}>
            <table ref={tableRef} className={s.table}>
              <THead<T> />
              <TBody<T> />
            </table>
          </SelectProvider>
        </TreeProvider>
      </tableContext.Provider>
    </Scrollbar>
  );
};

type TTable = typeof TableComponent & {
  Column: typeof Column;
  Head: typeof Head;
  Cell: typeof Cell;
};
export const Table: TTable = Object.assign(TableComponent, {
  Column,
  Head,
  Cell,
});
