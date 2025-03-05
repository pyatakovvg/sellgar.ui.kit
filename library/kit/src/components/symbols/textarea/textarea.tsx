import React from 'react';

import cn from 'classnames';
import s from './default.module.scss';

export interface IProps extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'size' | 'className'> {
  ref?: React.RefCallback<HTMLTextAreaElement> | React.RefObject<HTMLTextAreaElement>;
  size?: 'xs' | 'md';
  target?: 'destructive';
}

const useAutosizeTextArea = (textAreaRef: React.RefObject<HTMLTextAreaElement | null>, value: any) => {
  React.useEffect(() => {
    if (textAreaRef?.current) {
      textAreaRef.current.style.height = 'auto';
      textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
    }
  }, [textAreaRef, value]);
};

export const Textarea: React.FC<IProps> = ({ ref, size = 'md', target, ...props }) => {
  const inputRef = React.useRef<HTMLTextAreaElement>(null);
  const [value, setValue] = React.useState(props.defaultValue || props.value);
  const [isFocused, setFocused] = React.useState(false);
  const classNameButton = React.useMemo(
    () =>
      cn(
        s.wrapper,
        {
          [s['focused']]: isFocused,
        },
        {
          [s['size--medium']]: size === 'md',
          [s['size--extra-small']]: size === 'xs',
        },
        {
          [s['disabled']]: props.disabled,
        },
        {
          [s['destructive']]: target === 'destructive',
        },
      ),
    [isFocused, size, target, props.disabled],
  );

  React.useImperativeHandle(ref, () => inputRef.current!, [inputRef]);

  useAutosizeTextArea(inputRef, value);

  const handleFocus = () => {
    setFocused(true);
  };

  const handleBlur = () => {
    setFocused(false);
  };

  return (
    <div className={classNameButton}>
      <div className={s.content}>
        <textarea
          ref={inputRef}
          {...props}
          className={s.input}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onInput={(event: React.FocusEvent<HTMLTextAreaElement>) => {
            return setValue(event.target.value);
          }}
        />
      </div>
    </div>
  );
};
