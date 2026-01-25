import React from 'react';
import { OverlayScrollbarsComponent, OverlayScrollbarsComponentRef, useOverlayScrollbars } from 'overlayscrollbars-react';

import './default.css';

interface IProps extends React.HTMLAttributes<HTMLDivElement> {
  ref?: any;
  contentStyle?: React.CSSProperties;
}

const applyStyles = (element: HTMLElement, styles: React.CSSProperties) => {
  Object.entries(styles).forEach(([property, value]) => {
    if (value != null) {
      const camelCaseProp = property.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
      (element.style as any)[camelCaseProp] = value;
    }
  });
};

export const Scrollbar: React.FC<React.PropsWithChildren<IProps>> = ({ ref, contentStyle, ...props }) => {
  const divRef = React.useRef<OverlayScrollbarsComponentRef>(null);
  const [initBodyOverlayScrollbars] = useOverlayScrollbars({
    defer: true,
    events: {
      initialized: (c) => {
        console.log(123, c);
      },
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
      const contentElement: HTMLDivElement = divRef.current.getElement()?.querySelector('[data-overlayscrollbars-contents]')!;

      if (contentElement && contentStyle) {
        applyStyles(contentElement, contentStyle);
      }

      initBodyOverlayScrollbars(divRef.current.getElement()!);
    }
  }, [divRef.current, contentStyle, initBodyOverlayScrollbars]);

  return (
    <OverlayScrollbarsComponent ref={divRef} {...props}>
      {props.children}
    </OverlayScrollbarsComponent>
  );
};
