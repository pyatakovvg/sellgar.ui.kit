import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import react from '@vitejs/plugin-react';
import webfontDownload from 'vite-plugin-webfont-dl';
import { libInjectCss } from 'vite-plugin-lib-inject-css';

export default defineConfig({
  build: {
    lib: {
      entry: ['src/index.ts', 'src/theme/index.css', 'src/theme/index.scss'],
      name: 'index',
      fileName: 'index',
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
      embedFonts: true,
    }),
    libInjectCss(),
    dts({ outDir: 'types' }),
  ],
});
