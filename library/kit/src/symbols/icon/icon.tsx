import React from 'react';

import cn from 'classnames';
import s from './default.module.scss';

export type TIconName =
  | 'add-line'
  | 'apps-line'
  | 'arrow-right-line'
  | 'close-circle-line'
  | 'file-pdf-line'
  | 'flashlight-fill'
  | 'git-pull-request-line'
  | 'information-line'
  | 'layout-2-line'
  | 'search-line'
  | 'share-box-line'
  | 'subtract-line';

interface IProps {
  className?: string;
  icon: TIconName;
}

export const Icon: React.FC<IProps> = (props) => {
  const className = React.useMemo(
    () => cn(s.icon, props.className, 'icon-' + props.icon),
    [props.className, props.icon],
  );
  return <span className={className} />;
};
