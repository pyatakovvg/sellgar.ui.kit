import type { Preview } from '@storybook/react';

import '@tiyn/kit/theme/fonts/icons/style.css';
import '@tiyn/kit/theme/fonts/inter/style.css';
import '@tiyn/kit/theme/fonts/geologica/style.css';
import '@tiyn/kit/theme/theme.css';

const preview: Preview = {
  parameters: {
    docs: {
      inlineStories: false,
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
        size: /size$/,
      },
    },
  },
};

export default preview;
