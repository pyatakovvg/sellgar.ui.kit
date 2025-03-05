import React from 'react';
import SmoothScrollbar from 'smooth-scrollbar';
import OverscrollPlugin from 'smooth-scrollbar/plugins/overscroll';

import s from './default.module.scss';

interface IProps {
  scrollTop?: number;
}

export const Scrollbar: React.FC<React.PropsWithChildren<IProps>> = (props) => {
  const divRef = React.useRef(null);
  const [scrollbar, setScrollbar] = React.useState<SmoothScrollbar | null>(null);

  React.useEffect(() => {
    if (scrollbar) {
      if (props.scrollTop !== undefined) {
        scrollbar.scrollTop = props.scrollTop;
      }
    }
  }, [scrollbar, props.scrollTop]);

  React.useEffect(() => {
    if (divRef.current) {
      SmoothScrollbar.use(OverscrollPlugin);

      setScrollbar(
        SmoothScrollbar.init(divRef.current, {
          renderByPixels: true,
          alwaysShowTracks: true,
          continuousScrolling: false,
          plugins: {
            overscroll: {
              effect: 'bounce',
            },
          },
        }),
      );

      SmoothScrollbar.detachStyle();
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
    <div ref={divRef} className={s.wrapper} data-scrollbar={''}>
      {props.children}
    </div>
  );
};
