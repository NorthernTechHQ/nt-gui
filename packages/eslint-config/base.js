import js from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier/flat';
import importPlugin from 'eslint-plugin-import';
import sonarjsPlugin from 'eslint-plugin-sonarjs';
import { defineConfig } from 'eslint/config';
import globals from 'globals';
import { resolve } from 'node:path';
import ts from 'typescript-eslint';

/**
 * Shared logic used by all configurations
 */
export const baseConfig = defineConfig(
  {
    ignores: ['**/node_modules/**', '**/dist/**', '.eslintrc.js', '**/*.css']
  },
  js.configs.recommended,
  ts.configs.recommended,
  eslintConfigPrettier,
  {
    files: ['**/*.{js,mjs,cjs,ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
      globals: { ...globals.browser },
      parser: ts.parser,
      parserOptions: {
        tsconfigRootDir: resolve(process.cwd())
      }
    },
    plugins: {
      import: importPlugin,
      sonarjs: sonarjsPlugin
    },
    rules: {
      'arrow-body-style': ['error', 'as-needed'],
      'consistent-this': ['error', 'self'],
      'import/no-named-as-default': 'off',
      'no-console': 'off',
      'no-prototype-builtins': 'off',
      'no-unused-vars': 'off',
      quotes: ['error', 'single', { allowTemplateLiterals: true }],
      'sonarjs/cognitive-complexity': ['error', 17],
      '@typescript-eslint/ban-ts-comment': 'off',
      '@typescript-eslint/member-ordering': ['error', { default: { order: 'alphabetically-case-insensitive' } }],
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': 'error'
    }
  }
);
