import eslintConfigReact from '@northern.tech/eslint-config/react.js';

export default [
  ...eslintConfigReact,
  {
    rules: {
      '@typescript-eslint/consistent-type-imports': 'error'
    }
  }
];
