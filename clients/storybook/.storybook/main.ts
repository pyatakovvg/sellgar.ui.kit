import { mergeConfig } from 'vite';
import type { StorybookConfig } from '@storybook/react-vite';

import { fileURLToPath } from 'node:url';
import { join, dirname, resolve } from 'node:path';

/**
 * This function is used to resolve the absolute path of a package.
 * It is needed in projects that use Yarn PnP or are set up within a monorepo.
 */
function getAbsolutePath(value: string): any {
  return dirname(fileURLToPath(import.meta.resolve(join(value, 'package.json'))));
}

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(ts|tsx)'],
  addons: ['@storybook/addon-docs'],
  docs: {
    docsMode: true,
    defaultName: 'Документация'.toLowerCase(),
  },
  framework: {
    name: getAbsolutePath('@storybook/react-vite'),
    options: {},
  },
  typescript: {
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      // 👇 Default prop filter, which excludes props from node_modules
      propFilter: (prop) => (prop.parent ? !/node_modules/.test(prop.parent.fileName) : true),
    },
  },
  async viteFinal(config) {
    const kitPath = resolve(process.cwd(), '../../library/kit');

    return mergeConfig(config, {
      resolve: {
        alias: {
          ...config.resolve?.alias ||{},
          '@sellgar/kit': join(kitPath, 'src'),
        },
      },
      optimizeDeps: {
        exclude: ['node_modules'],
        include: ['@storybook/react', '@babel/runtime/helpers/extends', '@babel/runtime/helpers/inheritsLoose'],
      },
      build: {
        outDir: './build',
        chunkSizeWarningLimit: 1000, // Увеличьте лимит до 1000 кБ
        rollupOptions: {
          external: ['@babel/runtime/helpers/extends', '@babel/runtime/helpers/inheritsLoose'],
          onwarn(warning: any, warn: any) {
            if (warning.code === 'MODULE_LEVEL_DIRECTIVE') {
              return;
            }
            warn(warning);
          },
        },
      },
      css: {
        preprocessorOptions: {
          scss: {
            api: 'modern-compiler',
            silenceDeprecations: ['legacy-js-api'],
          },
        },
      },
      plugins: [],
    });
  },
};
export default config;
