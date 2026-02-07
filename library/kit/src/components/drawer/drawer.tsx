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

import { Close } from './close';
import { Scrollbar } from '../wrappers';

import s from './default.module.scss';

interface IProps {
  isClosable?: boolean;
  isEscapeClosable?: boolean;
  isOverlayClosable?: boolean;
  open?: boolean;
  initialOpen?: boolean;
  onOpen?(): void;
  onClose?(): void;
}

export function useDrawer({
  initialOpen,
  isClosable,
  isEscapeClosable,
  isOverlayClosable,
  open: controlledOpen,
  onOpen,
  onClose,
}: IProps = {}) {
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
  const dismiss = useDismiss(context, {
    outsidePressEvent: 'click',
    escapeKey: isEscapeClosable ?? false,
    outsidePress: isOverlayClosable ?? false,
  });
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

export const DialogContent = React.forwardRef<HTMLDivElement, React.HTMLProps<HTMLDivElement>>(
  function DialogContent(props, propRef) {
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
  },
);

export const DrawerComponent: React.FC<React.PropsWithChildren<IProps>> = ({
  isClosable,
  isOverlayClosable,
  isEscapeClosable,
  ...props
}) => {
  return (
    <Dialog
      open={props.open}
      onOpen={props.onOpen}
      onClose={props.onClose}
      isEscapeClosable={isEscapeClosable}
      isOverlayClosable={isOverlayClosable}
    >
      <DialogContent className={s.wrapper}>
        {isClosable && (
          <div className={s.close}>
            <Close />
          </div>
        )}
        {props.children}
      </DialogContent>
    </Dialog>
  );
};

type TDrawer = typeof DrawerComponent & {
  Close: typeof Close;
};

export const Drawer: TDrawer = Object.assign(DrawerComponent, {
  Close,
});
