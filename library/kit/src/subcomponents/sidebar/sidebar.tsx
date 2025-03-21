import React from 'react';

import { Typography } from '../../components/symbols';
import { Divider as DividerComponent } from '../../components/misc';

import s from './default.module.scss';

const SidebarComponent: React.FC<React.PropsWithChildren> = (props) => {
  return <div className={s.wrapper}>{props.children}</div>;
};

const Top: React.FC<React.PropsWithChildren> = (props) => {
  return <div className={s.top}>{props.children}</div>;
};

const Middle: React.FC<React.PropsWithChildren> = (props) => {
  return <div className={s.middle}>{props.children}</div>;
};

const Bottom: React.FC<React.PropsWithChildren> = (props) => {
  return <div className={s.bottom}>{props.children}</div>;
};

const Cell: React.FC<React.PropsWithChildren> = (props) => {
  return <div className={s.cell}>{props.children}</div>;
};

const SubCells: React.FC<React.PropsWithChildren> = (props) => {
  return <div className={s['sub-cells']}>{props.children}</div>;
};

const Additional: React.FC<React.PropsWithChildren> = (props) => {
  return (
    <div className={s.additional}>
      <Typography size={'caption-m'} weight={'semi-bold'}>
        <p>{props.children}</p>
      </Typography>
    </div>
  );
};

const Block: React.FC<React.PropsWithChildren> = (props) => {
  return <div className={s.block}>{props.children}</div>;
};

const Divider: React.FC = () => {
  return (
    <div className={s.divider}>
      <DividerComponent />
    </div>
  );
};

type TSidebar = typeof SidebarComponent & {
  Top: typeof Top;
  Middle: typeof Middle;
  Bottom: typeof Bottom;
  Divider: typeof Divider;
  Cell: typeof Cell;
  SubCells: typeof SubCells;
  Additional: typeof Additional;
  Block: typeof Block;
};

export const Sidebar: TSidebar = Object.assign(SidebarComponent, {
  Top,
  Middle,
  Bottom,
  Divider,
  Cell,
  SubCells,
  Additional,
  Block,
});
