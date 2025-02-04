import type { StorybookConfig } from '@storybook/react-vite';
import { dirname, join } from 'path';

const getAbsolutePath = value => dirname(require.resolve(join(value, 'package.json')));

const config: StorybookConfig = {
  stories: ['../packages/**/*.stories.tsx'],
  addons: [getAbsolutePath('@storybook/addon-links'), getAbsolutePath('@storybook/addon-essentials')],
  framework: {
    name: getAbsolutePath('@storybook/react-vite'),
    options: {}
  },
  staticDirs: ['./public'],
  core: {},

  async viteFinal(config) {
    // customize the Vite config here
    return {
      ...config,
      define: { 'process.env': {} }
    };
  },

  docs: {
    autodocs: true
  }
};

export default config;
