import React from 'react';
import { OverlayScrollbars, SizeObserverPlugin } from 'overlayscrollbars';

import './default.css';

interface IProps extends React.HTMLAttributes<HTMLDivElement> {
  ref?: React.RefCallback<HTMLDivElement>;
}

export const Scrollbar: React.FC<React.PropsWithChildren<IProps>> = ({ ref, ...props }) => {
  const divRef = React.useRef<HTMLDivElement>(null);
  const [scrollbar, setScrollbar] = React.useState<OverlayScrollbars | null>(null);

  React.useImperativeHandle(ref, () => divRef.current!);

  React.useEffect(() => {
    if (divRef.current) {
      OverlayScrollbars.plugin(SizeObserverPlugin);

      const scrollbar = OverlayScrollbars(divRef.current, {});

      setScrollbar(scrollbar!);
    }
  }, [divRef]);

  React.useEffect(() => {
    return () => {
      if (scrollbar) {
        scrollbar.destroy();
      }
    };
  }, [scrollbar]);

  return (
    <div ref={divRef} {...props}>
      {props.children}
    </div>
  );
};
