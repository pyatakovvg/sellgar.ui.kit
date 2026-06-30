import { Floating } from '@sellgar/kit';

import type { Meta, StoryObj } from '@storybook/react-vite';

import React from 'react';
import cn from 'classnames';
import s from './default.module.css';

const meta: Meta<typeof Floating> = {
  title: 'Kit/Systems/Floating/Floating',
  component: Floating,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    placement: 'bottom-start',
    presentation: 'popover',
  },
  argTypes: {
    placement: {
      options: [
        'top',
        'right',
        'bottom',
        'left',
        'top-start',
        'top-end',
        'right-start',
        'right-end',
        'bottom-start',
        'bottom-end',
        'left-start',
        'left-end',
      ],
      control: 'select',
    },
    presentation: {
      options: ['auto', 'popover', 'sheet'],
      control: 'radio',
    },
    role: {
      options: [
        'dialog',
        'alertdialog',
        'menu',
        'listbox',
        'grid',
        'tree',
        'tooltip',
      ],
      control: 'select',
    },
  },
};

type Story = StoryObj<typeof meta>;

export default meta;

const renderPanelContent = () => (
  <>
    <div className={s.item}>Первый элемент</div>
    <div className={s.item}>Второй элемент</div>
    <div className={s.item}>Третий элемент</div>
  </>
);

const listOptions = [
  {
    id: 'profile',
    title: 'Профиль',
  },
  {
    disabled: true,
    id: 'billing',
    title: 'Биллинг недоступен',
  },
  {
    id: 'settings',
    title: 'Настройки',
  },
  {
    id: 'support',
    title: 'Поддержка',
  },
] as const;

const selectOptions = [
  {
    caption: 'Системные настройки',
    id: 'settings',
    title: 'Настройки',
  },
  {
    caption: 'Финансовый раздел',
    disabled: true,
    id: 'billing',
    title: 'Биллинг',
  },
  {
    caption: 'Пользовательская поддержка',
    id: 'support',
    title: 'Поддержка',
  },
  {
    caption: 'Личный кабинет',
    id: 'profile',
    title: 'Профиль',
  },
] as const;

export const Default: Story = {
  render(args) {
    return (
      <Floating {...args}>
        <Floating.Trigger>
          {(state) => (
            <button
              ref={state.ref}
              type={'button'}
              disabled={state.isDisabled}
              className={cn(s.trigger, {
                [s.triggerActive]: state.isOpen,
                [s.triggerDisabled]: state.isDisabled,
                [s.triggerFocus]: state.isKeyboardFocused,
              })}
              {...state.getTriggerProps()}
            >
              Открыть
            </button>
          )}
        </Floating.Trigger>

        <Floating.Content minWidth={240}>
          {(state) => {
            if (state.presentation === 'sheet') {
              return (
                <div
                  ref={state.ref}
                  className={s.sheet}
                  style={state.transitionStyles}
                  {...state.getContentProps()}
                >
                  <p className={s.state}>presentation: sheet</p>
                  {renderPanelContent()}
                </div>
              );
            }

            return (
              <div
                ref={state.ref}
                className={s.panel}
                style={{
                  ...state.floatingStyles,
                  ...state.transitionStyles,
                }}
                {...state.getContentProps()}
              >
                <p className={s.state}>placement: {state.placement}</p>
                {renderPanelContent()}
              </div>
            );
          }}
        </Floating.Content>
      </Floating>
    );
  },
};

export const MatchReferenceWidth: Story = {
  render() {
    return (
      <div className={s.wrapper}>
        <Floating placement={'bottom-start'} presentation={'popover'}>
          <Floating.Trigger>
            {(state) => (
              <button
                ref={state.ref}
                type={'button'}
                className={cn(s.trigger, {
                  [s.triggerActive]: state.isOpen,
                  [s.triggerFocus]: state.isKeyboardFocused,
                })}
                {...state.getTriggerProps()}
              >
                Широкий trigger для проверки ширины
              </button>
            )}
          </Floating.Trigger>

          <Floating.Content matchReferenceWidth>
            <div className={s.panel}>{renderPanelContent()}</div>
          </Floating.Content>
        </Floating>
      </div>
    );
  },
};

export const Sheet: Story = {
  render() {
    return (
      <Floating placement={'bottom-start'} presentation={'sheet'}>
        <Floating.Trigger>
          {(state) => (
            <button
              ref={state.ref}
              type={'button'}
              className={cn(s.trigger, {
                [s.triggerActive]: state.isOpen,
                [s.triggerFocus]: state.isKeyboardFocused,
              })}
              {...state.getTriggerProps()}
            >
              Открыть sheet
            </button>
          )}
        </Floating.Trigger>

        <Floating.Content>
          {(state) => (
            <div
              ref={state.ref}
              className={s.sheet}
              {...state.getContentProps()}
            >
              {renderPanelContent()}
            </div>
          )}
        </Floating.Content>
      </Floating>
    );
  },
};

export const Disabled: Story = {
  render() {
    return (
      <Floating disabled presentation={'popover'}>
        <Floating.Trigger>
          {(state) => (
            <button
              ref={state.ref}
              type={'button'}
              disabled={state.isDisabled}
              className={cn(s.trigger, s.triggerDisabled)}
              {...state.getTriggerProps()}
            >
              Disabled
            </button>
          )}
        </Floating.Trigger>

        <Floating.Content>
          <div className={s.panel}>{renderPanelContent()}</div>
        </Floating.Content>
      </Floating>
    );
  },
};

export const RoleListbox: Story = {
  render() {
    return (
      <Floating
        placement={'bottom-start'}
        presentation={'popover'}
        role={'listbox'}
      >
        <Floating.Trigger>
          {(state) => (
            <button
              ref={state.ref}
              type={'button'}
              className={cn(s.trigger, {
                [s.triggerActive]: state.isOpen,
                [s.triggerFocus]: state.isKeyboardFocused,
              })}
              {...state.getTriggerProps()}
            >
              Открыть listbox
            </button>
          )}
        </Floating.Trigger>

        <Floating.Content minWidth={240}>
          {(state) => (
            <div
              ref={state.ref}
              className={s.panel}
              style={{
                ...state.floatingStyles,
                ...state.transitionStyles,
              }}
              {...state.getContentProps()}
            >
              <div className={s.item}>Option 1</div>
              <div className={s.item}>Option 2</div>
              <div className={s.item}>Option 3</div>
            </div>
          )}
        </Floating.Content>
      </Floating>
    );
  },
};

export const DismissPolicy: Story = {
  render() {
    return (
      <Floating
        closeOnEscape={false}
        placement={'bottom-start'}
        presentation={'popover'}
      >
        <Floating.Trigger>
          {(state) => (
            <button
              ref={state.ref}
              type={'button'}
              className={cn(s.trigger, {
                [s.triggerActive]: state.isOpen,
                [s.triggerFocus]: state.isKeyboardFocused,
              })}
              {...state.getTriggerProps()}
            >
              Escape не закрывает
            </button>
          )}
        </Floating.Trigger>

        <Floating.Content minWidth={260}>
          {(state) => (
            <div
              ref={state.ref}
              className={s.panel}
              style={{
                ...state.floatingStyles,
                ...state.transitionStyles,
              }}
              {...state.getContentProps()}
            >
              <p className={s.state}>closeOnEscape: false</p>
              {renderPanelContent()}
            </div>
          )}
        </Floating.Content>
      </Floating>
    );
  },
};

export const OverlayLockScroll: Story = {
  render() {
    return (
      <Floating
        lockScroll
        modal
        placement={'bottom-start'}
        presentation={'sheet'}
        withOverlay
      >
        <Floating.Trigger>
          {(state) => (
            <button
              ref={state.ref}
              type={'button'}
              className={cn(s.trigger, {
                [s.triggerActive]: state.isOpen,
                [s.triggerFocus]: state.isKeyboardFocused,
              })}
              {...state.getTriggerProps()}
            >
              Открыть overlay
            </button>
          )}
        </Floating.Trigger>

        <Floating.Content>
          {(state) => (
            <div
              ref={state.ref}
              className={s.sheet}
              {...state.getContentProps()}
            >
              <p className={s.state}>withOverlay + lockScroll</p>
              {renderPanelContent()}
            </div>
          )}
        </Floating.Content>
      </Floating>
    );
  },
};

export const ListLayer: Story = {
  render() {
    const [value, setValue] = React.useState('profile');

    return (
      <Floating
        initialFocus={0}
        placement={'bottom-start'}
        presentation={'popover'}
      >
        <Floating.Trigger>
          {(state) => (
            <button
              ref={state.ref}
              type={'button'}
              className={cn(s.trigger, {
                [s.triggerActive]: state.isOpen,
                [s.triggerFocus]: state.isKeyboardFocused,
              })}
              {...state.getTriggerProps()}
            >
              Раздел: {value}
            </button>
          )}
        </Floating.Trigger>

        <Floating.Content minWidth={280}>
          {(contentState) => (
            <div
              ref={contentState.ref}
              className={s.panel}
              style={{
                ...contentState.floatingStyles,
                ...contentState.transitionStyles,
              }}
              {...contentState.getContentProps()}
            >
              <Floating.List
                getItemDisabled={(item) => item.disabled === true}
                getItemValue={(item) => item.id}
                items={listOptions}
                value={value}
                onValueChange={(nextValue) => {
                  if (typeof nextValue === 'string') {
                    setValue(nextValue);
                  }
                }}
              >
                {(listState) => (
                  <div
                    {...listState.getListProps({
                      className: s.list,
                    })}
                  >
                    {listState.items.map((itemState) => (
                      <div
                        key={itemState.value}
                        {...itemState.getItemProps({
                          className: cn(s.option, {
                            [s.optionActive]: itemState.isActive,
                            [s.optionDisabled]: itemState.isDisabled,
                            [s.optionSelected]: itemState.isSelected,
                          }),
                        })}
                      >
                        {itemState.item.title}
                      </div>
                    ))}
                  </div>
                )}
              </Floating.List>

              <p className={s.state}>selected: {value}</p>
            </div>
          )}
        </Floating.Content>
      </Floating>
    );
  },
};

export const SelectLayer: Story = {
  render() {
    const [value, setValue] = React.useState('settings');
    const selectedOption = selectOptions.find((option) => option.id === value);

    return (
      <Floating
        initialFocus={0}
        placement={'bottom-start'}
        presentation={'popover'}
      >
        <Floating.Trigger>
          {(state) => (
            <button
              ref={state.ref}
              type={'button'}
              className={cn(s.trigger, {
                [s.triggerActive]: state.isOpen,
                [s.triggerFocus]: state.isKeyboardFocused,
              })}
              {...state.getTriggerProps()}
            >
              {selectedOption?.title ?? 'Выбрать'}
            </button>
          )}
        </Floating.Trigger>

        <Floating.Content matchReferenceWidth minWidth={320}>
          {(contentState) => (
            <div
              ref={contentState.ref}
              className={s.panel}
              style={{
                ...contentState.floatingStyles,
                ...contentState.transitionStyles,
              }}
              {...contentState.getContentProps()}
            >
              <Floating.Select
                getItemDisabled={(item) => item.disabled === true}
                getItemValue={(item) => item.id}
                items={selectOptions}
                value={value}
                onChange={(nextValue) => {
                  if (typeof nextValue === 'string') {
                    setValue(nextValue);
                  }
                }}
              >
                {(selectState) => (
                  <div
                    {...selectState.getListProps({
                      className: s.list,
                    })}
                  >
                    {selectState.items.map((itemState) => (
                      <div
                        key={itemState.value}
                        {...itemState.getItemProps({
                          className: cn(s.option, {
                            [s.optionActive]: itemState.isActive,
                            [s.optionDisabled]: itemState.isDisabled,
                            [s.optionSelected]: itemState.isSelected,
                          }),
                        })}
                      >
                        <span className={s.optionTitle}>
                          {itemState.item.title}
                        </span>
                        <span className={s.optionCaption}>
                          {itemState.item.caption}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </Floating.Select>

              <p className={s.state}>selected: {value}</p>
            </div>
          )}
        </Floating.Content>
      </Floating>
    );
  },
};
