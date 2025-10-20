import React from 'react';

import { iconName, type TIconName } from './icon.types.ts';

interface IProps {
  icon: TIconName;
}

export const IconComponent: React.FC<IProps> = (props) => {
  return <span className={'icon-' + props.icon} />;
};

type TIcon = typeof IconComponent & typeof iconName;

export const Icon: TIcon = Object.assign(IconComponent, { ...iconName });
