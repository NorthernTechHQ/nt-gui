import * as eslintPluginMdx from 'eslint-plugin-mdx';
import eslintPluginStorybook from 'eslint-plugin-storybook';
import { defineConfig } from 'eslint/config';

import { baseConfig } from './base.js';

/**
 * Flat config version of the Storybook ESLint configuration.
 */
export default defineConfig([
  ...baseConfig,
  eslintPluginMdx.flat,
  ...eslintPluginStorybook.configs['flat/recommended'],
  {
    rules: {
      'import/no-default-export': 'off'
    }
  }
]);
