import reactConfig from '@northern.tech/eslint-config/react.js';
import eslintPluginStorybook from 'eslint-plugin-storybook';

export default [
  ...reactConfig,
  ...eslintPluginStorybook.configs['flat/recommended'],
  {
    ignores: ['node_modules/', 'dist/', 'packages/types', 'packages/eslint-config', 'storybook-static/', '**/*.md']
  }
];
