import React from 'react';

import { WithIcon, type IProps as IPropsWithIcon } from './with-icon';
import { WithSlot, type IProps as IPropsWithSlot } from './with-slot';

interface IPropsIcon extends IPropsWithIcon {
  type?: 'icon';
}

interface IPropsSlot extends IPropsWithSlot {
  type?: 'slot';
}

type ChipProps = IPropsIcon | IPropsSlot;

export const Chip: React.FC<ChipProps> = ({ type = 'icon', ...props }) => {
  if (type === 'icon') {
    return <WithIcon {...props} />;
  } else if (type === 'slot') {
    return <WithSlot {...props} />;
  }
};
