import { Icon, iconName, TIconName } from '@sellgar/kit';

import React from 'react';

export const iconMapping = Object.values(iconName).reduce(
  (acc, icon) => {
    acc[icon] = <Icon icon={icon as TIconName} />;
    return acc;
  },
  {} as Record<string, React.JSX.Element>,
);
