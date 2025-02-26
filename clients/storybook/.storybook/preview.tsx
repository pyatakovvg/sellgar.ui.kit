import type { Preview } from '@storybook/react';
// @ts-ignore
import('@library/kit/src/theme/index.css');

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
