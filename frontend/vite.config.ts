/// <reference types="vitest/config" />s
import { defineConfig } from 'vite';
import { reactRouter } from '@react-router/dev/vite';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [!process.env.VITEST && reactRouter(), tsconfigPaths()],
  test: {
    globals: true,
    setupFiles: './test/setup.ts',
    environment: 'jsdom'
  }
});
