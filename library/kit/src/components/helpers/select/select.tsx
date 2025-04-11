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

import { Icon } from '../../symbols';
import { DropDownWrapper } from '../../wrappers';

import cn from 'classnames';
import s from './default.module.scss';

interface IOptions {
  tabIndex?: number;
  initialOpen?: boolean;
  initialSelectedIndex?: number | null;
  selectedIndex?: number | null;
  open?: boolean;
  disabled?: boolean;
  setOpen?(open: boolean): void;
  onFocus?(): void;
  onBlur?(): void;
  onSelect?(selectedIndex: number | null): void;
}

const useSelect = (options: IOptions) => {
  const listRef = React.useRef<Array<HTMLElement | null>>([]);
  const [activeIndex, setActiveIndex] = React.useState<number | null>(null);
  const [selectedIndex, setSelectedIndex] = React.useState<number | null | undefined>(
    () => (options.selectedIndex || options.initialSelectedIndex) ?? null,
  );
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(options.initialOpen);

  const open = options.open ?? uncontrolledOpen;
  const setOpen = options.setOpen ?? setUncontrolledOpen;

  const floating = useFloating<ReferenceType>({
    open,
    onOpenChange: (open: boolean) => {
      if (options.disabled) {
        return void 0;
      }
      setOpen(open);
    },
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

  const click = useClick(floatingContext, { event: 'click', enabled: !options.disabled });
  const role = useRole(floatingContext, { role: 'listbox' });
  const dismiss = useDismiss(floatingContext);
  const listNav = useListNavigation(floatingContext, {
    listRef,
    activeIndex,
    selectedIndex,
    onNavigate: setActiveIndex,
    loop: true,
    nested: true,
    virtual: true,
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
      tabIndex: options.tabIndex,
      disabled: options.disabled,
      onSelect: options.onSelect,
      onBlur: options.onBlur,
      onFocus: options.onFocus,
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
    options.tabIndex,
    options.disabled,
    options.onSelect,
    options.onBlur,
    options.onFocus,
  ]);
};

export type TSelectContext = ReturnType<typeof useSelect>;
const SelectContext = React.createContext({} as TSelectContext);

export const useSelectContext = () => {
  const context = React.useContext(SelectContext);

  if (context == null) {
    throw new Error('Select components must be wrapped in <Select />');
  }
  return context;
};

interface IProps {
  tabIndex?: number;
  initialOpen?: boolean;
  initialSelectedIndex?: number | null;
  open?: boolean;
  disabled?: boolean;
  selectedIndex?: number | null;
  setOpen?(open: boolean): void;
  onSelect?(selectedIndex: number | null): void;
  onFocus?(): void;
  onBlur?(): void;
}

const SelectWrapper: React.FC<React.PropsWithChildren<IProps>> = ({ children, ...options }) => {
  const select = useSelect(options);

  React.useEffect(() => {
    select.setSelectedIndex(options.selectedIndex);
  }, [options.selectedIndex]);

  return <SelectContext.Provider value={select}>{children}</SelectContext.Provider>;
};

interface IReferenceProps {
  reference(context: TSelectContext): React.ReactNode;
}

const Reference = React.memo((props: IReferenceProps) => {
  const select = useSelectContext();

  const referenceProps = select.interactions.getReferenceProps();

  return (
    <div
      className={s.wrapper}
      tabIndex={select.tabIndex}
      ref={select.floating.refs.setReference}
      {...referenceProps}
      onFocus={() => {
        select.onFocus && select.onFocus();
      }}
      onBlur={() => {
        select.onBlur && select.onBlur();
      }}
    >
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

  return (
    <FloatingPortal>
      <FloatingFocusManager context={select.floating.context}>
        <DropDownWrapper
          {...select.interactions.getFloatingProps()}
          ref={select.floating.refs.setFloating}
          style={{
            ...transitionStyles,
            ...select.floating.floatingStyles,
            outline: 'none',
            zIndex: 999,
          }}
        >
          {!!options.length ? options : props.empty}
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

  React.useEffect(() => {
    select.setSelectedIndex(select.selectedIndex);
  }, [select.selectedIndex]);

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

          select.onSelect && select.onSelect(props.index);

          props.onClick && props.onClick(event);
        },
        onKeyDown(event) {
          if (event.key === 'Enter') {
            event.preventDefault();

            select.setSelectedIndex(select.activeIndex);
            select.onSelect && select.onSelect(select.activeIndex);

            props.onChange && props.onChange(event);
          }

          if (event.key === ' ') {
            event.preventDefault();

            select.setSelectedIndex(select.activeIndex);
            select.onSelect && select.onSelect(select.activeIndex);

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
