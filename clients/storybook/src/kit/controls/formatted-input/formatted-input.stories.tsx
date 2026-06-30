import {
  FormattedInput,
  FormattedInputAmountPlugin,
  FormattedInputDatePlugin,
  FormattedInputMaskPlugin,
} from '@sellgar/kit';

import type {
  IFormattedInputReactProps,
  TFormattedInputDateDisplayTokenOptions,
  TFormattedInputMaskTokenOptions,
} from '@sellgar/kit';

import React from 'react';

import type { Meta, StoryObj } from '@storybook/react-vite';

import s from './formatted-input.stories.module.scss';

const meta: Meta<typeof FormattedInput> = {
  title: 'Kit/Controls/FormattedInput',
  component: FormattedInput,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  args: {
    placeholder: 'Введите значение',
  },
  argTypes: {
    onChange: {
      control: false,
    },
  },
};

type Story = StoryObj<typeof meta>;

export default meta;

const getAmountStoryNumberText = (rawValue: string): string => {
  if (rawValue.length === 0 || rawValue === '-' || rawValue === '+') {
    return '<undefined>';
  }

  const parseValue = rawValue.endsWith('.') ? rawValue.slice(0, -1) : rawValue;
  const value = Number(parseValue);

  return Number.isFinite(value) ? String(value) : '<undefined>';
};

const createPhoneMaskSlot = (): TFormattedInputMaskTokenOptions => ({
  type: 'slot',
  placeholder: '_',
  placeholderClassName: s.phoneMaskPlaceholder,
  rule: /\d/,
});

const phoneMask: readonly TFormattedInputMaskTokenOptions[] = [
  {
    type: 'separator',
    char: '+',
    className: s.plus,
  },
  {
    type: 'literal',
    char: '7',
  },
  {
    type: 'separator',
    char: ' ',
  },
  {
    type: 'separator',
    char: '(',
    className: s.blue,
  },
  {
    type: 'slot',
    placeholder: '_',
    valueClassName: s.big,
    placeholderClassName: s.phoneMaskPlaceholder,
    rule: /\d/,
  },

  {
    type: 'slot',
    placeholder: '_',
    valueClassName: s.big,
    placeholderClassName: s.phoneMaskPlaceholder,
    rule: /\d/,
  },
  {
    type: 'slot',
    placeholder: '_',
    valueClassName: s.big,
    placeholderClassName: s.phoneMaskPlaceholder,
    rule: /\d/,
  },
  {
    type: 'separator',
    char: ')',
    className: s.blue,
  },
  {
    type: 'separator',
    char: ' ',
  },
  {
    type: 'slot',
    placeholder: '_',
    placeholderClassName: s.phoneMaskPlaceholder,
    rule: /\d/,
  },
  createPhoneMaskSlot(),
  createPhoneMaskSlot(),
  {
    type: 'separator',
    char: '-',
    className: s.phoneMaskPlaceholder,
  },
  createPhoneMaskSlot(),
  createPhoneMaskSlot(),
  {
    type: 'separator',
    char: '-',
    className: s.phoneMaskPlaceholder,
  },
  createPhoneMaskSlot(),
  createPhoneMaskSlot(),
];

const dateDisplayFormat: readonly TFormattedInputDateDisplayTokenOptions[] = [
  {
    type: 'slot',
    pattern: 'DD',
  },
  {
    type: 'separator',
    char: '.',
  },
  {
    type: 'slot',
    pattern: 'MM',
  },
  {
    type: 'separator',
    char: '.',
  },
  {
    type: 'slot',
    pattern: 'YYYY',
  },
];

const dateTimeDisplayFormat: readonly TFormattedInputDateDisplayTokenOptions[] = [
  {
    type: 'slot',
    pattern: 'DD',
  },
  {
    type: 'separator',
    char: '/',
  },
  {
    type: 'slot',
    pattern: 'MM',
  },
  {
    type: 'separator',
    char: '/',
  },
  {
    type: 'slot',
    pattern: 'YYYY',
  },
  {
    type: 'separator',
    char: ' ',
  },
  {
    type: 'slot',
    pattern: 'HH',
  },
  {
    type: 'separator',
    char: ':',
  },
  {
    type: 'slot',
    pattern: 'mm',
  },
];

const customDateTimeDisplayFormat: readonly TFormattedInputDateDisplayTokenOptions[] = [
  {
    type: 'slot',
    pattern: 'DD',
    className: s.dateDay,
  },
  {
    type: 'separator',
    char: '_|_',
    className: s.dateSeparator,
  },
  {
    type: 'slot',
    pattern: 'MM',
    className: s.dateMonth,
  },
  {
    type: 'separator',
    char: '//',
    className: s.dateSeparator,
  },
  {
    type: 'slot',
    pattern: 'YYYY',
    className: s.dateYear,
  },
  {
    type: 'separator',
    char: ' -- ',
    className: s.dateSeparator,
  },
  {
    type: 'slot',
    pattern: 'HH',
    className: s.dateHour,
  },
  {
    type: 'separator',
    char: '\\\\:\\\\',
    className: s.dateSeparator,
  },
  {
    type: 'slot',
    pattern: 'mm',
    className: s.dateMinute,
  },
];

const timeDisplayFormat: readonly TFormattedInputDateDisplayTokenOptions[] = [
  {
    type: 'slot',
    pattern: 'HH',
  },
  {
    type: 'separator',
    char: ':',
  },
  {
    type: 'slot',
    pattern: 'mm',
  },
];

const monthYearDisplayFormat: readonly TFormattedInputDateDisplayTokenOptions[] = [
  {
    type: 'slot',
    pattern: 'MM',
  },
  {
    type: 'separator',
    char: '.',
  },
  {
    type: 'slot',
    pattern: 'YY',
  },
];

const FormattedInputProbe: React.FC<IFormattedInputReactProps> = (props) => {
  const [value, setValue] = React.useState('');
  const [lastCommand, setLastCommand] = React.useState('<none>');
  const [lastOperations, setLastOperations] = React.useState('<none>');
  const [lastCaret, setLastCaret] = React.useState('0');

  return (
    <div style={{ display: 'grid', gap: 12, width: 420 }}>
      <FormattedInput
        {...props}
        value={value}
        onChange={(nextValue, meta) => {
          setValue(nextValue);
          setLastCommand(meta.transaction.command.type);
          setLastOperations(meta.transaction.operations.map((operation) => operation.type).join(', ') || '<none>');
          setLastCaret(String(meta.transaction.after.selection.focus.position.rawOffset));
        }}
      />
      <dl style={{ display: 'grid', gridTemplateColumns: 'max-content 1fr', gap: '6px 12px', margin: 0 }}>
        <dt>raw</dt>
        <dd>
          <code>{value || '<empty>'}</code>
        </dd>
        <dt>command</dt>
        <dd>
          <code>{lastCommand}</code>
        </dd>
        <dt>operations</dt>
        <dd>
          <code>{lastOperations}</code>
        </dd>
        <dt>caret</dt>
        <dd>
          <code>{lastCaret}</code>
        </dd>
      </dl>
    </div>
  );
};

const PhoneMaskProbe: React.FC = () => {
  const [value, setValue] = React.useState('');
  const [lastCommand, setLastCommand] = React.useState('<none>');
  const [lastCaret, setLastCaret] = React.useState('0');
  const plugins = React.useMemo(
    () => [
      new FormattedInputMaskPlugin({
        mask: phoneMask,
      }),
    ],
    [],
  );

  return (
    <div style={{ display: 'grid', gap: 12, width: 420 }}>
      <FormattedInput
        autoCapitalize="off"
        autoCorrect="off"
        className={s.phoneInput}
        enterKeyHint="done"
        inputMode="tel"
        plugins={plugins}
        spellCheck={false}
        value={value}
        onChange={(nextValue, meta) => {
          setValue(nextValue);
          setLastCommand(meta.transaction.command.type);
          setLastCaret(String(meta.transaction.after.selection.focus.position.rawOffset));
        }}
      />
      <dl style={{ display: 'grid', gridTemplateColumns: 'max-content 1fr', gap: '6px 12px', margin: 0 }}>
        <dt>phone raw</dt>
        <dd>
          <code>{value || '<empty>'}</code>
        </dd>
        <dt>command</dt>
        <dd>
          <code>{lastCommand}</code>
        </dd>
        <dt>caret</dt>
        <dd>
          <code>{lastCaret}</code>
        </dd>
      </dl>
    </div>
  );
};

const AmountProbe: React.FC = () => {
  const [value, setValue] = React.useState('');
  const [lastCommand, setLastCommand] = React.useState('<none>');
  const [lastValue, setLastValue] = React.useState('<undefined>');
  const plugins = React.useMemo(
    () => [
      new FormattedInputAmountPlugin({
        allowNegative: true,
        fractionDigits: 2,
        symbolClassNames: {
          decimalSeparator: s.amountDecimalSeparator,
          fraction: s.amountFraction,
          groupSeparator: s.amountGroupSeparator,
          integer: s.amountInteger,
          negativeSign: s.amountNegativeSign,
          sign: s.amountSign,
        },
      }),
    ],
    [],
  );

  return (
    <div style={{ display: 'grid', gap: 12, width: 420 }}>
      <FormattedInput
        autoCapitalize="off"
        autoCorrect="off"
        enterKeyHint="done"
        inputMode="decimal"
        placeholder="Введите сумму"
        plugins={plugins}
        spellCheck={false}
        value={value}
        onChange={(nextValue, meta) => {
          setValue(nextValue);
          setLastValue(getAmountStoryNumberText(nextValue));
          setLastCommand(meta.transaction.command.type);
        }}
      />
      <dl style={{ display: 'grid', gridTemplateColumns: 'max-content 1fr', gap: '6px 12px', margin: 0 }}>
        <dt>number</dt>
        <dd>
          <code>{lastValue}</code>
        </dd>
        <dt>command</dt>
        <dd>
          <code>{lastCommand}</code>
        </dd>
      </dl>
    </div>
  );
};

const DateProbe: React.FC<{
  displayFormat: readonly TFormattedInputDateDisplayTokenOptions[];
  initialValue?: string;
  label: string;
  placeholder?: string;
}> = (props) => {
  const [value, setValue] = React.useState(props.initialValue ?? '');
  const [lastCommand, setLastCommand] = React.useState('<none>');
  const plugins = React.useMemo(
    () => [
      new FormattedInputDatePlugin({
        displayFormat: props.displayFormat,
        outputFormat: "YYYY-MM-DD'T'HH:mm:ssXXX",
      }),
    ],
    [props.displayFormat],
  );

  return (
    <div style={{ display: 'grid', gap: 12, width: 420 }}>
      <strong>{props.label}</strong>
      <FormattedInput
        autoCapitalize="off"
        autoCorrect="off"
        enterKeyHint="done"
        inputMode="numeric"
        placeholder={props.placeholder ?? 'введите дату'}
        plugins={plugins}
        spellCheck={false}
        value={value}
        onChange={(nextValue, meta) => {
          setValue(nextValue);
          setLastCommand(meta.transaction.command.type);
        }}
      />
      <dl style={{ display: 'grid', gridTemplateColumns: 'max-content 1fr', gap: '6px 12px', margin: 0 }}>
        <dt>iso raw</dt>
        <dd>
          <code>{value || '<empty>'}</code>
        </dd>
        <dt>command</dt>
        <dd>
          <code>{lastCommand}</code>
        </dd>
      </dl>
    </div>
  );
};

const AccessModeProbe: React.FC<Pick<IFormattedInputReactProps, 'disabled' | 'readOnly'>> = (props) => {
  const [value, setValue] = React.useState('12345');
  const [lastCommand, setLastCommand] = React.useState('<none>');

  return (
    <div style={{ display: 'grid', gap: 12, width: 420 }}>
      <FormattedInput
        {...props}
        value={value}
        onChange={(nextValue, meta) => {
          setValue(nextValue);
          setLastCommand(meta.transaction.command.type);
        }}
      />
      <dl style={{ display: 'grid', gridTemplateColumns: 'max-content 1fr', gap: '6px 12px', margin: 0 }}>
        <dt>raw</dt>
        <dd>
          <code>{value || '<empty>'}</code>
        </dd>
        <dt>command</dt>
        <dd>
          <code>{lastCommand}</code>
        </dd>
      </dl>
    </div>
  );
};

export const Default: Story = {
  render(args) {
    return (
      <div style={{ display: 'grid', gap: 32 }}>
        <FormattedInputProbe {...args} />
        <PhoneMaskProbe />
      </div>
    );
  },
};

export const NumericKeyboard: Story = {
  args: {
    inputMode: 'numeric',
    placeholder: 'Введите цифры',
  },
  render(args) {
    return <FormattedInputProbe {...args} />;
  },
};

export const MobileHints: Story = {
  args: {
    autoCapitalize: 'words',
    autoCorrect: 'on',
    enterKeyHint: 'send',
    inputMode: 'email',
    placeholder: 'Mobile hints',
    spellCheck: true,
  },
  render(args) {
    return <FormattedInputProbe {...args} />;
  },
};

export const AutoFocus: Story = {
  args: {
    autoFocus: true,
    placeholder: 'Auto focus',
  },
  render(args) {
    return <FormattedInputProbe {...args} />;
  },
};

export const Amount: Story = {
  render() {
    return <AmountProbe />;
  },
};

export const Date: Story = {
  render() {
    return (
      <div style={{ display: 'grid', gap: 32 }}>
        <DateProbe displayFormat={dateDisplayFormat} label="date: DD.MM.YYYY" />
        <DateProbe
          displayFormat={dateTimeDisplayFormat}
          initialValue="2026-06-04T15:30:00+00:00"
          label="datetime: DD/MM/YYYY HH:mm"
        />
        <DateProbe
          displayFormat={customDateTimeDisplayFormat}
          initialValue="2026-06-04T15:30:00+00:00"
          label="custom: DD_|_MM//YYYY -- HH\\:\\mm"
        />
        <DateProbe displayFormat={timeDisplayFormat} label="time: HH:mm" placeholder="введите время" />
        <DateProbe
          displayFormat={monthYearDisplayFormat}
          initialValue="2026-06-04T15:30:00+00:00"
          label="month/year: MM.YY"
        />
      </div>
    );
  },
};

export const AccessModes: Story = {
  render() {
    return (
      <div style={{ display: 'grid', gap: 32 }}>
        <AccessModeProbe readOnly />
        <AccessModeProbe disabled />
      </div>
    );
  },
};
