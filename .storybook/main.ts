import path from 'path';
import { fileURLToPath } from 'url';
import type { StorybookConfig } from '@storybook/react-vite';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const config: StorybookConfig = {
  stories: ['../packages/**/*.stories.tsx'],
  framework: {
    name: '@storybook/react-vite',
    options: {}
  },
  staticDirs: ['./public'],

  async viteFinal(config) {
    // customize the Vite config here
    return {
      ...config,
      define: { 'process.env': {} },
      resolve: {
        ...config.resolve,
        alias: [
          ...(Array.isArray(config.resolve?.alias) ? config.resolve.alias : []),
          {
            find: /^@mui\/material(\/.*)?$/,
            replacement: path.resolve(__dirname, '../packages/common-ui/node_modules/@mui/material$1')
          },
          {
            find: 'tss-react/mui',
            replacement: path.resolve(__dirname, '../node_modules/tss-react/esm/mui/index.js')
          }
        ]
      }
    };
  }
};

export default config;
