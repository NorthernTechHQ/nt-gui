import { config as commonConfig } from '@northern.tech/typescript-config/tsup-config.js';
import { defineConfig } from 'tsup';
import { lessLoader } from 'esbuild-plugin-less';

const config = {
  ...commonConfig,
  esbuildPlugins: [lessLoader()]
};

export default defineConfig(options => ({
  ...config,
  ...options
}));
