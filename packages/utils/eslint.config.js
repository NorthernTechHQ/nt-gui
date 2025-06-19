import eslintConfigLibrary from '@northern.tech/eslint-config/library.js';

export default [
  ...eslintConfigLibrary,
  {
    rules: {
      '@typescript-eslint/consistent-type-imports': 'error'
    }
  }
];
