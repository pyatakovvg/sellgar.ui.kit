import React from 'react';

import { TIconName } from './icon.types.ts';

interface IProps {
  icon: TIconName;
}

export const Icon: React.FC<IProps> = (props) => {
  return <span className={'icon-' + props.icon} />;
};
