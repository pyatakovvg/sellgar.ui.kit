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
  useClick,
  type ReferenceType,
} from '@floating-ui/react';
import React from 'react';

import { DropDownWrapper } from '../../wrappers';

import s from './default.module.scss';
import { Icon } from '../../symbols';
import cn from 'classnames';

interface IOptions {
  initialOpen?: boolean;
  initialSelectedIndex?: number;
  open?: boolean;
  setOpen?(open: boolean): void;
}

const useSelect = (options: IOptions) => {
  const listRef = React.useRef<Array<HTMLElement | null>>([]);
  const [activeIndex, setActiveIndex] = React.useState<number | null>(null);
  const [selectedIndex, setSelectedIndex] = React.useState<number | null>(() => options.initialSelectedIndex ?? null);
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
            maxHeight: `var(--numbers-288)`,
          });
        },
        padding: 10,
      }),
    ],
  });

  const floatingContext = floating.context;

  const click = useClick(floatingContext, { event: 'click' });
  const role = useRole(floatingContext, { role: 'listbox' });
  const dismiss = useDismiss(floatingContext);
  const listNav = useListNavigation(floatingContext, {
    listRef,
    activeIndex,
    selectedIndex,
    onNavigate: setActiveIndex,
    loop: true,
    nested: true,
    allowEscape: true,
  });
  const interactions = useInteractions([role, dismiss, listNav, click]);

  return React.useMemo(() => {
    return {
      open,
      setOpen,
      role,
      dismiss,
      listRef,
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

type TSelectContext = ReturnType<typeof useSelect>;
const SelectContext = React.createContext({} as TSelectContext);

export const useSelectContext = () => {
  const context = React.useContext(SelectContext);

  if (context == null) {
    throw new Error('Select components must be wrapped in <Select />');
  }
  return context;
};

interface IProps {
  initialOpen?: boolean;
  initialSelectedIndex?: number;
  open?: boolean;
  setOpen?(open: boolean): void;
}

const SelectWrapper: React.FC<React.PropsWithChildren<IProps>> = ({ children, ...options }) => {
  const select = useSelect(options);

  return <SelectContext.Provider value={select}>{children}</SelectContext.Provider>;
};

interface IReferenceProps {
  reference(context: TSelectContext): React.ReactNode;
}

const Reference = React.memo((props: IReferenceProps) => {
  const select = useSelectContext();

  return (
    <div className={s.wrapper} {...select.interactions.getReferenceProps()} ref={select.floating.refs.setReference}>
      {props.reference(select)}
    </div>
  );
});

interface IOptionsProps {
  empty: React.ReactNode;
  options(context: TSelectContext): React.ReactNode[];
}

const Options = React.memo((props: IOptionsProps) => {
  const select = useSelectContext();
  const { isMounted, styles: transitionStyles } = useTransitionStyles(select.floating.context);

  const options = props.options(select);

  if (!select.open && !isMounted) {
    return null;
  }

  if (!options.length) {
    return (
      <FloatingPortal>
        <DropDownWrapper
          {...select.interactions.getFloatingProps()}
          ref={select.floating.refs.setFloating}
          style={{
            ...transitionStyles,
            ...select.floating.floatingStyles,
          }}
        >
          {props.empty}
        </DropDownWrapper>
      </FloatingPortal>
    );
  }

  return (
    <FloatingPortal>
      <FloatingFocusManager context={select.floating.context}>
        <DropDownWrapper
          {...select.interactions.getFloatingProps()}
          ref={select.floating.refs.setFloating}
          style={{
            outline: 'none',
            ...transitionStyles,
            ...select.floating.floatingStyles,
          }}
        >
          {options}
        </DropDownWrapper>
      </FloatingFocusManager>
    </FloatingPortal>
  );
});

interface IOptionProps {
  index: number;
  option(context: TSelectContext): React.ReactNode;
  onClick?(event: React.MouseEvent<HTMLElement>): void;
  onChange?(event: React.KeyboardEvent<HTMLElement>): void;
}

const Option = React.memo((props: IOptionProps) => {
  const id = useId();
  const select = useSelectContext();

  const isHover = React.useMemo(() => select.activeIndex === props.index, [select.activeIndex]);
  const isSelected = React.useMemo(() => select.selectedIndex === props.index, [select.selectedIndex]);

  const containerClassName = React.useMemo(
    () =>
      cn(s.container, {
        [s.hover]: isHover,
        [s.selected]: isSelected,
      }),
    [isHover, isSelected],
  );

  return (
    <div
      id={id}
      role={'option'}
      className={s.option}
      tabIndex={props.index === select.activeIndex ? select.activeIndex : -1}
      {...select.interactions.getItemProps({
        ref(node) {
          select.listRef.current[props.index] = node;
        },
        onClick(event: React.MouseEvent<HTMLElement>) {
          select.setSelectedIndex(props.index);
          props.onClick && props.onClick(event);
        },
        onKeyDown(event) {
          if (event.key === 'Enter') {
            event.preventDefault();
            select.setSelectedIndex(props.index);
            props.onChange && props.onChange(event);
          }

          if (event.key === ' ') {
            event.preventDefault();
            select.setSelectedIndex(props.index);
            props.onChange && props.onChange(event);
          }
        },
      })}
    >
      <div className={containerClassName}>
        <div className={s.content}>{props.option(select)}</div>
        {isSelected && (
          <div className={s['selected-icon']}>
            <Icon icon={'check-line'} />
          </div>
        )}
      </div>
    </div>
  );
});

type TSelect = typeof SelectWrapper & {
  Reference: typeof Reference;
  Options: typeof Options;
  Option: typeof Option;
};

export const Select: TSelect = Object.assign(SelectWrapper, {
  Reference,
  Options,
  Option,
});
