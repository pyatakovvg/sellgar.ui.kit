import React from 'react';

import { Option } from '../option';

import { Dot } from '../../../misc';
import { Select as SelectHelper } from '../../../helpers/select';

import s from './default.module.scss';

interface IOptionsProps<T extends Record<string, any>, K extends keyof T> {
  index: number;
  deps: number;
  option: T;
  accessor: K;
  optionKey: K;
  optionValue: K;
  templateOption?(option: T): React.ReactNode;
  onClick?(event: React.MouseEvent<HTMLElement>): void;
  onChange?(event: React.KeyboardEvent<HTMLElement>): void;
}

const Options = <T extends Record<string, any>, K extends keyof T>(props: IOptionsProps<T, K>) => {
  let options: React.ReactNode[] = [];

  options.push(
    <SelectHelper.Option
      index={props.index}
      onClick={props.onClick}
      onChange={props.onChange}
      option={() => {
        return props.templateOption ? (
          props.templateOption(props.option)
        ) : (
          <div className={s.wrapper}>
            {props.deps > 0 && (
              <div className={s.dots}>
                {Array(props.deps)
                  .fill(null)
                  .map((_, index) => (
                    <div key={index} className={s.dot} />
                  ))}
              </div>
            )}
            <div className={s.content}>
              <Option title={props.option[props.optionValue]} />
            </div>
          </div>
        );
      }}
    />,
  );

  if (props.option[props.accessor]) {
    options = [
      ...options,
      ...props.option[props.accessor].map((option: any) => Options({ ...props, option, deps: props.deps + 1 })),
    ];
  }

  return React.Children.toArray(options);
};

interface IProps<T extends Record<string, any>, K extends keyof T> {
  index: number;
  options: T[];
  accessor: K;
  optionKey: K;
  optionValue: K;
  templateOption?(option: T): React.ReactNode;
}

export const Tree = <T extends Record<string, any>, K extends keyof T>(props: IProps<T, K>) => {
  return React.Children.toArray(
    props.options.map((option) => {
      return Options({
        deps: 0,
        index: props.index,
        option: option,
        accessor: props.accessor,
        optionKey: props.optionKey,
        optionValue: props.optionValue,
        templateOption: props.templateOption,
      });
    }),
  );
};
