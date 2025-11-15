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
import { Scrollbar } from '../wrappers';

import s from './default.module.scss';

interface IProps {
  isClosable?: boolean;
  isOverlayClosable?: boolean;
  open?: boolean;
  initialOpen?: boolean;
  onOpen?(): void;
  onClose?(): void;
}

export function useDrawer({ initialOpen = false, isClosable = true, isOverlayClosable = false, open: controlledOpen, onOpen, onClose }: IProps = {}) {
  const open = controlledOpen ?? initialOpen;

  const data = useFloating({
    open,
    onOpenChange: () => {
      if (isOverlayClosable) {
        onClose && onClose();
      }
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
      isClosable,
      ...interactions,
      ...data,
    }),
    [open, onOpen, onClose, interactions, data],
  );
}

type ContextType = ReturnType<typeof useDrawer> | null;

const DrawerContext = React.createContext<ContextType>(null);

export const useDrawerContext = () => {
  const context = React.useContext(DrawerContext);

  if (context == null) {
    throw new Error('Dialog components must be wrapped in <Dialog />');
  }

  return context;
};

export const Dialog: React.FC<React.PropsWithChildren<IProps>> = ({ children, ...options }) => {
  const dialog = useDrawer(options);

  return <DrawerContext.Provider value={dialog}>{children}</DrawerContext.Provider>;
};

export const DialogContent = React.forwardRef<HTMLDivElement, React.HTMLProps<HTMLDivElement>>(function DialogContent(props, propRef) {
  const { context: floatingContext, ...context } = useDrawerContext();
  const ref = useMergeRefs([context.refs.setFloating, propRef]);

  if (!floatingContext.open) return null;

  return (
    <FloatingPortal>
      <FloatingOverlay className={s.overlay} lockScroll>
        <FloatingFocusManager context={floatingContext}>
          <Scrollbar ref={ref} {...context.getFloatingProps(props)}>
            {props.children}
          </Scrollbar>
        </FloatingFocusManager>
      </FloatingOverlay>
    </FloatingPortal>
  );
});

export const DialogClose = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(function DialogClose(props, ref) {
  const {
    isClosable,
    onClose,
    context: { onOpenChange },
  } = useDrawerContext();

  const handleClose = () => {
    if (!isClosable) {
      return void 0;
    }
    onOpenChange(false);
    onClose && onClose();
  };

  return (
    <div className={s.close} {...props} ref={ref} onClick={handleClose}>
      <Button form={'icon'} style={'ghost'} size={'xs'} shape={'pill'} leadIcon={<Icon icon={'close-line'} />} />
    </div>
  );
});

export const Drawer: React.FC<React.PropsWithChildren<IProps>> = ({ isClosable = true, ...props }) => {
  return (
    <Dialog open={props.open} onOpen={props.onOpen} onClose={props.onClose}>
      <DialogContent className={s.wrapper}>
        {isClosable && <DialogClose />}
        {props.children}
      </DialogContent>
    </Dialog>
  );
};
