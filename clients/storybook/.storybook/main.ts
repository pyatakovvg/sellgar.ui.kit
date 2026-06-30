// .storybook/main.ts
import { mergeConfig } from 'vite';
import type { StorybookConfig } from '@storybook/react-vite';

import { join, resolve } from 'node:path';

const storybookPath = resolve(process.cwd());
const kitPath = resolve(storybookPath, '../../library/kit');
const kitSourcePath = join(kitPath, 'src');

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
      tsconfigPath: resolve(storybookPath, 'tsconfig.docgen.json'),
      include: [
        join(storybookPath, 'src/**/*.tsx'),
        join(storybookPath, '.storybook/**/*.tsx'),
        join(kitSourcePath, '**/*.tsx'),
      ],
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: (prop) => (prop.parent ? !/node_modules/.test(prop.parent.fileName) : true),
    },
  },
  async viteFinal(config) {
    return mergeConfig(config, {
      resolve: {
        alias: {
          ...(config.resolve?.alias || {}),
          '@tiyn/kit': kitSourcePath,
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
