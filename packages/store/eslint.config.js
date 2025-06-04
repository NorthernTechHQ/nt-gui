import eslintConfigReact from '@northern.tech/eslint-config/react.js';

export default [
  ...eslintConfigReact,
  {
    languageOptions: {
      globals: {
        mender_environment: true,
        vi: false
      }
    },
    rules: {
      '@typescript-eslint/consistent-type-imports': 'error'
    }
  }
];
