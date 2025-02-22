import 'reflect-metadata';

import { LngProvider } from '@library/lng';
import type { Preview } from '@storybook/react';
// @ts-ignore
import('@library/kit/src/theme/themes.scss');

// @ts-ignore
import React from 'react';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;

export const decorators = [
  (Story) => {
    return (
      <LngProvider>
        <Story />
      </LngProvider>
    );
  },
];
