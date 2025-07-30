import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      {
        find: '@northern.tech/store',
        replacement: path.resolve(__dirname, 'packages/store/src')
      },
      {
        find: '@northern.tech/common-ui',
        replacement: path.resolve(__dirname, 'packages/common-ui/src/')
      },
      {
        find: '@northern.tech/testing',
        replacement: path.resolve(__dirname, 'packages/testing/src')
      },
      {
        find: '@northern.tech/utils',
        replacement: path.resolve(__dirname, 'packages/utils/src')
      }
    ]
  },
  server: {
    port: 80,
    middlewareMode: false
  },
  test: {
    env: {
      BABEL_ENV: 'test',
      NODE_ENV: 'test',
      PUBLIC_URL: '',
      TZ: 'UTC'
    },
    //TODO: change to 3
    retry: 0,
    environment: 'jsdom',
    globals: true,
    setupFiles: path.resolve(__dirname, 'tests', 'setupTests.jsx'),
    fakeTimers: {
      toFake: ['setTimeout', 'clearTimeout', 'Date']
    }
  }
});
