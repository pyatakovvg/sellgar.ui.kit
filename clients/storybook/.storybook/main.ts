// .storybook/main.ts
import { mergeConfig } from 'vite';
import type { StorybookConfig } from '@storybook/react-vite';

import { join, resolve } from 'node:path';

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(ts|tsx)'],
  addons: ['@storybook/addon-docs'],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  typescript: {
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: (prop) => (prop.parent ? !/node_modules/.test(prop.parent.fileName) : true),
    },
  },
  async viteFinal(config) {
    const kitPath = resolve(process.cwd(), '../../library/kit');

    return mergeConfig(config, {
      resolve: {
        alias: {
          ...(config.resolve?.alias || {}),
          '@sellgar/kit': join(kitPath, 'src'),
        },
      },
      build: {
        outDir: './build',
        chunkSizeWarningLimit: 1000,
      },
    });
  },
};

export default config;
