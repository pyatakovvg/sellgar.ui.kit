import React from 'react';

import { Process } from './process';
import { Exception } from './exception';

import cn from 'classnames';
import s from './image.module.scss';

interface IProps extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'alt' | 'width' | 'height'> {
  width?: number;
  height?: number;
}

export const Image: React.FC<IProps> = (props) => {
  const imgRef = React.useRef<HTMLImageElement>(null);

  const [isError, setError] = React.useState(false);
  const [isLoading, setLoading] = React.useState(true);

  const imageClassName = React.useMemo(
    () =>
      cn(s.image, props.className, {
        [s.hide]: isLoading || isError,
      }),
    [props.className, isLoading, isError],
  );

  React.useEffect(() => {
    const handleLoad = () => {
      setLoading(false);
    };

    const handleError = () => {
      setError(true);
    };

    if (imgRef.current) {
      imgRef.current.addEventListener('load', handleLoad);
      imgRef.current.addEventListener('error', handleError);
    }
    return () => {
      if (imgRef.current) {
        imgRef.current.removeEventListener('load', handleLoad);
        imgRef.current.removeEventListener('error', handleError);
      }
    };
  }, [imgRef]);

  return (
    <div className={s.wrapper} style={{ width: props.width ?? 'auto', height: props.height ?? 'auto' }}>
      {isError && (
        <div className={s.process}>
          <Exception />
        </div>
      )}
      {isLoading && (
        <div className={s.exception}>
          <Process />
        </div>
      )}
      <img ref={imgRef} {...props} className={imageClassName} alt={'image'} />
    </div>
  );
};
