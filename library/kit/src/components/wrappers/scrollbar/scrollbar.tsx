import React from 'react';
import {
  useOverlayScrollbars,
  OverlayScrollbarsComponentRef,
  OverlayScrollbarsComponent,
} from 'overlayscrollbars-react';

import './default.css';

interface IProps extends React.HTMLAttributes<HTMLDivElement> {
  ref?: React.RefObject<HTMLDivElement> | React.RefCallback<HTMLDivElement>;
}

export const Scrollbar: React.FC<React.PropsWithChildren<IProps>> = ({ ref, ...props }) => {
  const divRef = React.useRef<OverlayScrollbarsComponentRef>(null);
  const [initBodyOverlayScrollbars] = useOverlayScrollbars({
    defer: true,
    events: {
      initialized: () => {},
      destroyed: () => {},
    },
    options: {
      scrollbars: {
        theme: 'os-theme-light',
        clickScroll: true,
      },
    },
  });

  React.useImperativeHandle(ref, () => divRef.current?.getElement()!);

  React.useEffect(() => {
    if (divRef.current) {
      initBodyOverlayScrollbars(divRef.current.getElement()!);
    }
  }, [divRef.current, initBodyOverlayScrollbars]);

  return (
    <OverlayScrollbarsComponent ref={divRef} {...props}>
      {props.children}
    </OverlayScrollbarsComponent>
  );
};
