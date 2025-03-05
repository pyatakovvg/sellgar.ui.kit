import React from 'react';

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

const Additional: React.FC<React.PropsWithChildren> = (props) => {
  return <div className={s.additional}>{props.children}</div>;
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
  Additional: typeof Additional;
};

export const Sidebar: TSidebar = Object.assign(SidebarComponent, {
  Top,
  Middle,
  Bottom,
  Divider,
  Cell,
  Additional,
});
