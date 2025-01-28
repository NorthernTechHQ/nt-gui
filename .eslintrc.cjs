/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  extends: ['@northern.tech/eslint-config/react.js', '@northern.tech/eslint-config/storybook.js'],
  ignorePatterns: ['node_modules/', 'dist/', 'packages/', 'storybook-static/'],
  globals: {
    globalThis: true
  },
  parserOptions: {
    project: true
  }
};
