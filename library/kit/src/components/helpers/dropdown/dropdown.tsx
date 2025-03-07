import {
  autoUpdate,
  size,
  flip,
  useDismiss,
  useFloating,
  useInteractions,
  useListNavigation,
  useRole,
  FloatingFocusManager,
  FloatingPortal,
  useTransitionStyles,
  useId,
  FloatingList,
  type ReferenceType,
} from '@floating-ui/react';
import React from 'react';

import { DropDownWrapper } from '../../wrappers';

import s from './default.module.scss';

interface IOptions {
  initialOpen?: boolean;
  open?: boolean;
  setOpen?(open: boolean): void;
}

const useDropdown = (options: IOptions) => {
  const listRef = React.useRef<Array<HTMLElement | null>>([]);
  const listContentRef = React.useRef<Array<string | null>>([]);
  const [activeIndex, setActiveIndex] = React.useState<number | null>(null);
  const [selectedIndex, setSelectedIndex] = React.useState<number | null>(null);
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(options.initialOpen);

  const open = options.open ?? uncontrolledOpen;
  const setOpen = options.setOpen ?? setUncontrolledOpen;

  const floating = useFloating<ReferenceType>({
    open,
    onOpenChange: setOpen,
    whileElementsMounted: autoUpdate,
    middleware: [
      flip({ padding: 10 }),
      size({
        apply({ rects, elements }) {
          Object.assign(elements.floating.style, {
            top: 'var(--numbers-8)',
            width: `${rects.reference.width}px`,
            minWidth: '300px',
            maxHeight: `var(--numbers-288)`,
          });
        },
        padding: 10,
      }),
    ],
  });

  const floatingContext = floating.context;

  const role = useRole(floatingContext, { role: 'listbox' });
  const dismiss = useDismiss(floatingContext);
  const listNav = useListNavigation(floatingContext, {
    listRef,
    activeIndex,
    onNavigate: setActiveIndex,
    loop: true,
    virtual: true,
  });
  const interactions = useInteractions([role, dismiss, listNav]);

  return React.useMemo(() => {
    return {
      open,
      setOpen,
      role,
      dismiss,
      listRef,
      listContentRef,
      activeIndex,
      setActiveIndex,
      selectedIndex,
      setSelectedIndex,
      floating,
      interactions,
    };
  }, [
    open,
    setOpen,
    role,
    dismiss,
    activeIndex,
    setActiveIndex,
    selectedIndex,
    setSelectedIndex,
    floating,
    interactions,
  ]);
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

interface IOptionsProps {
  empty: React.ReactNode;
  options(context: TDropdownContext): React.ReactNode[];
}

const Options = React.memo((props: IOptionsProps) => {
  const dropdown = useDropdownContext();
  const { isMounted, styles: transitionStyles } = useTransitionStyles(dropdown.floating.context);

  const options = props.options(dropdown);

  if (!dropdown.open && !isMounted) {
    return null;
  }

  if (!options.length) {
    return (
      <FloatingPortal>
        <DropDownWrapper
          {...dropdown.interactions.getFloatingProps()}
          ref={dropdown.floating.refs.setFloating}
          style={{
            ...transitionStyles,
            ...dropdown.floating.floatingStyles,
          }}
        >
          {props.empty}
        </DropDownWrapper>
      </FloatingPortal>
    );
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
          <FloatingList elementsRef={dropdown.listRef} labelsRef={dropdown.listContentRef}>
            {options}
          </FloatingList>
        </DropDownWrapper>
      </FloatingFocusManager>
    </FloatingPortal>
  );
});

interface IOptionProps {
  index: number;
  onClick?(event: React.MouseEvent<HTMLElement>): void;
  option(context: TDropdownContext): React.ReactNode;
}

const Option = React.memo((props: IOptionProps) => {
  const id = useId();
  const dropdown = useDropdownContext();

  return (
    <div
      id={id}
      role={'option'}
      className={s.option}
      {...dropdown.interactions.getItemProps()}
      ref={(node) => {
        dropdown.listRef.current[props.index] = node;
      }}
      onClick={(event) => {
        props.onClick && props.onClick(event);
      }}
    >
      {props.option(dropdown)}
    </div>
  );
});

type TDropdown = typeof DropdownWrapper & {
  Reference: typeof Reference;
  Options: typeof Options;
  Option: typeof Option;
};

export const Dropdown: TDropdown = Object.assign(DropdownWrapper, {
  Reference,
  Options,
  Option,
});
