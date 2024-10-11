/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  extends: ['@northern.tech/eslint-config/react.js'],
  ignorePatterns: ['node_modules/', 'dist/', '**/*.test.js'],
  globals: {
    mender_environment: true
  }
};
