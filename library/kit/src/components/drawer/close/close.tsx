import React from 'react';

import { Icon } from '../../symbols';

import { useDrawerContext } from '../drawer.tsx';

import s from './default.module.scss';

export const Close = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  function DialogClose(props, ref) {
    const {
      onClose,
      context: { onOpenChange },
    } = useDrawerContext();

    const handleClose = () => {
      onOpenChange(false);
      onClose && onClose();
    };

    return (
      <div className={s.close} {...props} ref={ref} onClick={handleClose}>
        <Icon icon={'close-fill'} />
      </div>
    );
  },
);
