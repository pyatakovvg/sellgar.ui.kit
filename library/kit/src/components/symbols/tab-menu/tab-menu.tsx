import React from 'react';

import { Tab, type IProps as ITabProps } from './tab';
import { context, Provider } from './tab.context.ts';

import cn from 'classnames';
import s from './default.module.scss';

const Menu: React.FC<React.PropsWithChildren> = (props) => {
  const { type, size, shape = 'rounded', setActiveTabName, activeTabName } = React.useContext(context);

  const handleClick = (tabName: string) => {
    setActiveTabName && setActiveTabName(tabName);
  };

  const className = React.useMemo(
    () =>
      cn(
        s.menu,
        {
          [s['type--fill']]: type === 'fill',
          [s['type--line']]: type === 'line',
          [s['type--segmented']]: type === 'segmented',
        },
        {
          [s['shape--pill']]: shape === 'pill',
        },
      ),
    [type, shape],
  );

  return (
    <div className={className}>
      {React.Children.map(props.children, (child) => {
        if (React.isValidElement(child)) {
          const childElement = child as React.ReactElement<ITabProps>;
          return (
            <div className={s.tab} onClick={() => handleClick(childElement.props.name as string)}>
              {React.cloneElement(childElement, {
                size,
                type,
                shape,
                style: type === 'fill' ? 'secondary' : 'primary',
                isActive: activeTabName === childElement.props.name,
              })}
            </div>
          );
        }
        return child;
      })}
    </div>
  );
};

interface IContentProps {
  name: string;
}

const Content: React.FC<React.PropsWithChildren<IContentProps>> = (props) => {
  const { activeTabName } = React.useContext(context);

  console.log(123, activeTabName, props.name);

  if (activeTabName !== props.name) {
    return null;
  }

  return props.children;
};

interface IProps {
  size?: 'lg' | 'md' | 'sm';
  shape?: 'rounded' | 'pill';
  type?: 'fill' | 'line' | 'segmented';
  defaultTabName?: string;
}

const TabMenuComponent: React.FC<React.PropsWithChildren<IProps>> = (props) => {
  const [activeTabName, setActiveTabName] = React.useState(props.defaultTabName);

  return (
    <Provider
      value={{
        size: props.size ?? 'lg',
        type: props.type ?? 'fill',
        shape: props.shape ?? 'rounded',
        activeTabName,
        setActiveTabName: (tabName) => setActiveTabName(tabName),
        onClick() {},
      }}
    >
      {props.children}
    </Provider>
  );
};

type TTabMenu = typeof TabMenuComponent & {
  Menu: typeof Menu & {
    Tab: typeof Tab;
  };
  Content: typeof Content;
};

export const TabMenu: TTabMenu = Object.assign(TabMenuComponent, {
  Menu: Object.assign(Menu, {
    Tab,
  }),
  Content,
});
