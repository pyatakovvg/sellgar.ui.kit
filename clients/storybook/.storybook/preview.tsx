import type { Preview } from '@storybook/react';

import '@sellgar/kit/development/icons.css';
import '@sellgar/kit/development/geologica.css';
import '@sellgar/kit/development/theme.css';

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
