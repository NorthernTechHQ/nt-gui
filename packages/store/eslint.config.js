import eslintConfigReact from '@northern.tech/eslint-config/react.js';

export default [
  ...eslintConfigReact,
  {
    ignores: ['node_modules/', 'dist/', '**/api/types/Settings.ts'],
    languageOptions: {
      globals: {
        mender_environment: true,
        vi: false
      }
    }
  }
];
