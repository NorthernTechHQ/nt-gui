/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  extends: ['@northern.tech/eslint-config/react.js'],
  ignorePatterns: ['node_modules/', 'dist/', '**/api/types/Settings.ts'],
  globals: {
    mender_environment: true,
    vi: false
  }
};
