import React from 'react';
import {
  useFloating,
  useClick,
  useDismiss,
  useRole,
  useInteractions,
  useMergeRefs,
  FloatingPortal,
  FloatingFocusManager,
  FloatingOverlay,
} from '@floating-ui/react';

import { Icon, Button } from '../symbols';

import s from './modal.module.scss';

interface IProps {
  open?: boolean;
  initialOpen?: boolean;
  onOpen?(): void;
  onClose?(): void;
}

export function useDialog({ initialOpen = false, open: controlledOpen, onOpen, onClose }: IProps = {}) {
  const open = controlledOpen ?? initialOpen;

  const data = useFloating({
    open,
    onOpenChange: () => {
      onClose && onClose();
    },
  });

  const context = data.context;

  const click = useClick(context, {
    enabled: controlledOpen === null,
  });
  const dismiss = useDismiss(context, { outsidePressEvent: 'mousedown' });
  const role = useRole(context);

  const interactions = useInteractions([click, dismiss, role]);

  React.useEffect(() => {
    if (onOpen && open) {
      onOpen();
    }
  }, [open]);

  return React.useMemo(
    () => ({
      open,
      onOpen,
      onClose,
      ...interactions,
      ...data,
    }),
    [open, onOpen, onClose, interactions, data],
  );
}

type ContextType = ReturnType<typeof useDialog> | null;

const DialogContext = React.createContext<ContextType>(null);

export const useModalContext = () => {
  const context = React.useContext(DialogContext);

  if (context == null) {
    throw new Error('Dialog components must be wrapped in <Dialog />');
  }

  return context;
};

export const Dialog: React.FC<React.PropsWithChildren<IProps>> = ({ children, ...options }) => {
  const dialog = useDialog(options);

  return <DialogContext.Provider value={dialog}>{children}</DialogContext.Provider>;
};

export const DialogContent = React.forwardRef<HTMLDivElement, React.HTMLProps<HTMLDivElement>>(function DialogContent(props, propRef) {
  const { context: floatingContext, ...context } = useModalContext();
  const ref = useMergeRefs([context.refs.setFloating, propRef]);

  if (!floatingContext.open) return null;

  return (
    <FloatingPortal>
      <FloatingOverlay className={s.overlay} lockScroll>
        <FloatingFocusManager context={floatingContext}>
          <div ref={ref} {...context.getFloatingProps(props)}>
            {props.children}
          </div>
        </FloatingFocusManager>
      </FloatingOverlay>
    </FloatingPortal>
  );
});

export const DialogClose = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(function DialogClose(props, ref) {
  const {
    onClose,
    context: { onOpenChange },
  } = useModalContext();

  const handleClose = () => {
    onOpenChange(false);
    onClose && onClose();
  };

  return (
    <div className={s.close} {...props} ref={ref} onClick={handleClose}>
      <Button form={'icon'} style={'ghost'} size={'xs'} shape={'pill'} leadIcon={<Icon icon={'close-line'} />} />
    </div>
  );
});

export const Modal: React.FC<React.PropsWithChildren<IProps>> = (props) => {
  return (
    <Dialog open={props.open} onOpen={props.onOpen} onClose={props.onClose}>
      <DialogContent className={s.wrapper}>
        <DialogClose />
        {props.children}
      </DialogContent>
    </Dialog>
  );
};
