import js from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier/flat';
import importPlugin from 'eslint-plugin-import';
import * as eslintPluginMdx from 'eslint-plugin-mdx';
import eslintPluginStorybook from 'eslint-plugin-storybook';
import { defineConfig } from 'eslint/config';
import globals from 'globals';
import { resolve } from 'node:path';
import ts from 'typescript-eslint';

/**
 * Flat config version of the Storybook ESLint configuration.
 */
export default defineConfig([
  {
    ignores: ['**/node_modules/**', '**/dist/**', '.eslintrc.js', '**/*.css']
  },
  js.configs.recommended,
  ts.configs.recommended,
  eslintPluginMdx.flat,
  ...eslintPluginStorybook.configs['flat/recommended'],
  eslintConfigPrettier,
  {
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
      globals: {
        ...globals.browser
      },
      parser: ts.parser,
      parserOptions: {
        tsconfigRootDir: resolve(process.cwd())
      }
    },
    plugins: {
      import: importPlugin
    },
    rules: {
      'import/no-default-export': 'off'
    }
  }
]);
