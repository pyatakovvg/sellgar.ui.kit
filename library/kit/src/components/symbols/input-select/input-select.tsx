import {
  autoUpdate,
  size,
  flip,
  useId,
  useDismiss,
  useFloating,
  useInteractions,
  useListNavigation,
  useRole,
  FloatingFocusManager,
  FloatingPortal,
  useTransitionStyles,
} from '@floating-ui/react';
import React from 'react';

import { Input } from '../input';
import { DropDownWrapper } from '../../wrappers';

import type { TIconName } from '../icon';

import s from './default.module.scss';

interface IChildrenProps<T, K extends keyof T> {
  option: T;
  key: T[K];
  value: T[K];
  active: boolean;
}

export interface IProps<T extends Record<string, any>, K extends keyof T>
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'className' | 'children'> {
  leadicon?: TIconName;
  tailicon?: TIconName;
  badge?: string | number;
  size?: 'xs' | 'md';
  target?: 'destructive';
  optionKey: K;
  optionValue: K;
  options: T[];
  children(props: IChildrenProps<T, K>): React.ReactNode;
}

interface ItemProps extends React.HTMLAttributes<HTMLDivElement> {
  ref?: React.Ref<HTMLDivElement | null>;
  children: React.ReactNode;
  active: boolean;
}

const Item: React.FC<React.PropsWithChildren<ItemProps>> = ({ ref, children, active, ...rest }) => {
  const id = useId();

  return (
    <div ref={ref} role="option" id={id} aria-selected={active} {...rest} className={s.option}>
      {children}
    </div>
  );
};

export const InputSelect = <T extends Record<string, any>, K extends keyof T>({
  children,
  options,
  optionKey,
  optionValue,
  ...props
}: IProps<T, K>) => {
  const [open, setOpen] = React.useState(false);
  const [inputValue, setInputValue] = React.useState('');
  const [activeIndex, setActiveIndex] = React.useState<number | null>(null);

  const listRef = React.useRef<Array<HTMLElement | null>>([]);

  const { refs, floatingStyles, context } = useFloating<HTMLInputElement>({
    whileElementsMounted: autoUpdate,
    open,
    onOpenChange: setOpen,
    middleware: [
      flip({ padding: 10 }),
      size({
        apply({ rects, elements }) {
          Object.assign(elements.floating.style, {
            top: '8px',
            width: `${rects.reference.width}px`,
            maxHeight: `300px`,
          });
        },
        padding: 10,
      }),
    ],
  });
  const { isMounted, styles } = useTransitionStyles(context);

  const role = useRole(context, { role: 'listbox' });
  const dismiss = useDismiss(context);
  const listNav = useListNavigation(context, {
    listRef,
    activeIndex,
    onNavigate: setActiveIndex,
    virtual: true,
    loop: true,
  });

  const { getReferenceProps, getFloatingProps, getItemProps } = useInteractions([role, dismiss, listNav]);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;
    setInputValue(value);

    if (value) {
      setOpen(true);
      setActiveIndex(0);
    } else {
      setOpen(false);
    }
  }

  const items = options.filter((item) => item[optionValue].toLowerCase().startsWith(inputValue.toLowerCase()));

  return (
    <>
      <div
        className={s.wrapper}
        {...getReferenceProps({
          ref: refs.setReference,
        })}
      >
        <Input
          {...props}
          {...getReferenceProps({
            onChange: handleChange,
            value: inputValue,
            'aria-autocomplete': 'list',
            onKeyDown(event) {
              if (event.key === 'Enter' && activeIndex != null && items[activeIndex]) {
                setInputValue(items[activeIndex][optionValue]);
                setActiveIndex(null);
                setOpen(false);
              }
            },
          })}
        />
      </div>

      <FloatingPortal>
        {open && isMounted && (
          <FloatingFocusManager context={context} initialFocus={-1} visuallyHiddenDismiss>
            <DropDownWrapper
              {...getFloatingProps({
                ref: refs.setFloating,
                style: {
                  ...styles,
                  ...floatingStyles,
                },
              })}
            >
              {items.map((item, index) => (
                <Item
                  key={item[optionKey]}
                  {...getItemProps({
                    ref(node) {
                      listRef.current[index] = node;
                    },
                    onClick() {
                      setInputValue(item[optionValue]);
                      setOpen(false);
                      refs.domReference.current?.focus();
                    },
                  })}
                  active={activeIndex === index}
                >
                  {children({
                    option: item,
                    key: item[optionKey],
                    value: item[optionValue],
                    active: activeIndex === index,
                  })}
                </Item>
              ))}
            </DropDownWrapper>
          </FloatingFocusManager>
        )}
      </FloatingPortal>
    </>
  );
};
