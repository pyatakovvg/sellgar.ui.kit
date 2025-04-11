import React from 'react';

import { Fill } from './fill';
import { Line } from './line';
import { Segmented } from './segmented';

export interface IProps {
  type?: 'fill' | 'line' | 'segmented';
  style?: 'primary' | 'secondary';
  size?: 'lg' | 'md' | 'sm';
  shape?: 'rounded' | 'pill';
  name: string;
  isActive?: boolean;
  title: string;
  leadIcon?: React.ReactNode;
  tailIcon?: React.ReactNode;
  badge?: React.ReactNode;
  onClick?(tabName: string): void;
}

export const Tab: React.FC<React.PropsWithChildren<IProps>> = ({ type, ...props }) => {
  if (type === 'line') {
    return <Line {...props} style={'primary'} onClick={() => props.onClick && props.onClick(props.name)} />;
  } else if (type === 'segmented') {
    return <Segmented {...props} style={'primary'} onClick={() => props.onClick && props.onClick(props.name)} />;
  }
  return <Fill {...props} onClick={() => props.onClick && props.onClick(props.name)} />;
};
