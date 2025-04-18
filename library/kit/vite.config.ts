import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import react from '@vitejs/plugin-react';
import webfontDownload from 'vite-plugin-webfont-dl';
import { libInjectCss } from 'vite-plugin-lib-inject-css';

export default defineConfig({
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler',
      },
    },
  },
  build: {
    cssCodeSplit: true,
    assetsInlineLimit: 0,
    lib: {
      entry: {
        index: 'src/index.ts',
        'theme.css': 'src/theme/index.css',
        'theme-viewport.css': 'src/theme/index.scss',
      },
      formats: ['es'],
    },
    rollupOptions: {
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'react/jsx-runtime': 'react/jsx-runtime',
        },
      },
      external: ['react', 'react/jsx-runtime'],
    },
  },
  plugins: [
    react(),
    webfontDownload(['https://fonts.googleapis.com/css2?family=Geologica:wght@100..900&display=swap'], {
      injectAsStyleTag: false,
      embedFonts: false,
    }),
    libInjectCss(),
    dts({ outDir: 'types' }),
  ],
});
