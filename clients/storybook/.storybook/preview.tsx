import type { Preview } from '@storybook/react';

import '@sellgar/kit/font.css';
import '@sellgar/kit/theme.css';

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
