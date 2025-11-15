import {
  autoUpdate,
  size,
  flip,
  offset,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
  useRole,
  FloatingFocusManager,
  FloatingPortal,
  useTransitionStyles,
  autoPlacement,
  type ReferenceType,
  type Placement,
} from '@floating-ui/react';
import React from 'react';

import { DropDownWrapper } from '../../wrappers';

import s from './default.module.scss';

interface IOptions {
  initialOpen?: boolean;
  open?: boolean;
  disabled?: boolean;
  setOpen?(open: boolean): void;
  placement?: Placement;
}

const useDropdown = ({ placement = 'bottom', ...options }: IOptions) => {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(options.initialOpen);

  const open = options.open ?? uncontrolledOpen;
  const setOpen = options.setOpen ?? setUncontrolledOpen;

  const floating = useFloating<ReferenceType>({
    open,
    placement,
    onOpenChange: (open: boolean) => {
      if (options.disabled) {
        return void 0;
      }
      setOpen(open);
    },
    whileElementsMounted: autoUpdate,
    middleware: [
      flip({ padding: 10 }),
      offset(8),
      autoPlacement(),
      size({
        apply({ rects, elements, placement }) {
          console.log(placement);
          Object.assign(elements.floating.style, {
            width: `${rects.reference.width}px`,
            minWidth: 'var(--numbers-320)',
            maxWidth: 'var(--numbers-400)',
          });
        },
        padding: 10,
      }),
    ],
  });

  const floatingContext = floating.context;

  const click = useClick(floatingContext);
  const role = useRole(floatingContext, { role: 'listbox' });
  const dismiss = useDismiss(floatingContext);
  const interactions = useInteractions([click, role, dismiss]);

  return React.useMemo(() => {
    return {
      open,
      setOpen,
      role,
      dismiss,
      floating,
      interactions,
      disabled: options.disabled,
    };
  }, [open, setOpen, role, dismiss, floating, interactions, options.disabled]);
};

type TDropdownContext = ReturnType<typeof useDropdown>;
const DropdownContext = React.createContext({} as TDropdownContext);

export const useDropdownContext = () => {
  const context = React.useContext(DropdownContext);

  if (context == null) {
    throw new Error('Dropdown components must be wrapped in <Dropdown />');
  }
  return context;
};

interface IProps {
  initialOpen?: boolean;
  open?: boolean;
  disabled?: boolean;
  setOpen?(open: boolean): void;
}

const DropdownWrapper: React.FC<React.PropsWithChildren<IProps>> = ({ children, ...options }) => {
  const dropdown = useDropdown(options);

  return <DropdownContext.Provider value={dropdown}>{children}</DropdownContext.Provider>;
};

interface IReferenceProps {
  reference(context: TDropdownContext): React.ReactNode;
}

const Reference = React.memo((props: IReferenceProps) => {
  const dropdown = useDropdownContext();

  return (
    <div className={s.wrapper} {...dropdown.interactions.getReferenceProps()} ref={dropdown.floating.refs.setReference}>
      {props.reference(dropdown)}
    </div>
  );
});

const Target: React.FC<React.PropsWithChildren> = React.memo((props) => {
  const dropdown = useDropdownContext();
  const { isMounted, styles: transitionStyles } = useTransitionStyles(dropdown.floating.context);

  if (!dropdown.open && !isMounted) {
    return null;
  }

  return (
    <FloatingPortal>
      <FloatingFocusManager context={dropdown.floating.context} initialFocus={-1} visuallyHiddenDismiss modal={false}>
        <DropDownWrapper
          {...dropdown.interactions.getFloatingProps()}
          ref={dropdown.floating.refs.setFloating}
          style={{
            ...transitionStyles,
            ...dropdown.floating.floatingStyles,
          }}
        >
          {props.children}
        </DropDownWrapper>
      </FloatingFocusManager>
    </FloatingPortal>
  );
});

type TDropdown = typeof DropdownWrapper & {
  Reference: typeof Reference;
  Target: typeof Target;
};

export const Dropdown: TDropdown = Object.assign(DropdownWrapper, {
  Reference,
  Target,
});
