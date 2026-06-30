import type { Meta, StoryObj } from '@storybook/react-vite';
import { MetricCard } from '@sellgar/kit';
import React from 'react';

const meta: Meta<typeof MetricCard> = {
  title: 'Kit/Content/MetricCard',
  component: MetricCard,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  args: {
    size: 's',
  },
  argTypes: {
    size: {
      options: ['s', 'm', 'l'],
      control: 'select',
    },
  },
};

export default meta;

type DefaultArgs = React.ComponentProps<typeof MetricCard> & {
  labelDynamics: React.ComponentProps<typeof MetricCard.Label>['dynamics'];
  labelText: string;
  valueType: React.ComponentProps<typeof MetricCard.Value>['type'];
  valueAmount: number;
  valueCurrency: React.ComponentProps<typeof MetricCard.Value>['currency'];
};

export const Default: StoryObj<DefaultArgs> = {
  args: {
    size: 's',

    labelDynamics: 'positive',
    labelText: 'Всякое за сегодня',

    valueType: 'currency',
    valueAmount: 123344,
    valueCurrency: 'RUB',
  },

  argTypes: {
    labelDynamics: {
      options: ['positive', 'default', 'negative'],
      control: 'select',
    },
    labelText: {
      control: 'text',
    },

    valueType: {
      options: ['currency', 'percentage', 'default'],
      control: 'select',
    },
    valueAmount: {
      control: 'number',
    },
    valueCurrency: {
      options: [undefined, 'KZT', 'RUB'],
      control: 'select',
    },
  },

  render: ({ labelDynamics, labelText, valueType, valueAmount, valueCurrency, ...args }) => (
    <MetricCard {...args}>
      <MetricCard.Value type={valueType} amount={valueAmount} currency={valueCurrency} />
      <MetricCard.Label dynamics={labelDynamics}>{labelText}</MetricCard.Label>
    </MetricCard>
  ),
};
