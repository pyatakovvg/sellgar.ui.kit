import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import { libInjectCss } from 'vite-plugin-lib-inject-css';

export default defineConfig({
  css: {
    preprocessorOptions: {},
  },
  build: {
    cssMinify: 'esbuild',
    cssCodeSplit: true,
    assetsInlineLimit: 5,
    lib: {
      entry: {
        index: 'src/index.ts',
        'icons.css': 'src/theme/fonts/icons/style.css',
        'inter.css': 'src/theme/fonts/inter/style.css',
        'geologica.css': 'src/theme/fonts/geologica/style.css',
        'theme.css': 'src/theme/theme.css',
        'theme.mobile.scss': 'src/theme/theme.mobile.css',
        'theme.desktop.scss': 'src/theme/theme.desktop.css',
      },
      formats: ['es'],
    },
    rollupOptions: {
      output: {
        globals: {
          react: 'React',
          classnames: 'classnames',
          'react/jsx-runtime': 'react/jsx-runtime',
        },
      },
      external: ['react', 'react-dom', 'classnames', 'react/jsx-runtime'],
    },
  },
  plugins: [libInjectCss(), dts({ outDir: 'types' })],
});
