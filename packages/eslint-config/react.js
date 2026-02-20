import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import { defineConfig } from 'eslint/config';

import { baseConfig } from './base.js';

/**
 * Flat config version of the React ESLint configuration.
 * Extends the shared base logic.
 */
export default defineConfig([
  ...baseConfig,

  reactPlugin.configs.flat.recommended,
  reactPlugin.configs.flat['jsx-runtime'],
  reactHooksPlugin.configs.flat['recommended'],

  {
    files: ['**/*.{js,mjs,cjs,ts,tsx}'],
    languageOptions: {
      globals: {
        JSX: true
      }
    },
    rules: {
      'react/forbid-dom-props': 'error',
      'react/jsx-no-target-blank': 'error',
      'react/jsx-pascal-case': 'error',
      'react/no-redundant-should-component-update': 'error',
      'react/no-this-in-sfc': 'error',
      'react/no-typos': 'error',
      'react/no-unsafe': 'error',
      'react/no-unused-prop-types': 'error',
      'react/prefer-es6-class': 'error',
      'react/prefer-stateless-function': 'error',
      'react/prop-types': 'off',
      'react/react-in-jsx-scope': 'off',
      'react/require-default-props': 'off',
      'react/self-closing-comp': 'error',
      'react/sort-prop-types': 'error',
      'react/state-in-constructor': 'error',
      'react/static-property-placement': 'error',
      'react/style-prop-object': 'error',
      'react/void-dom-elements-no-children': 'error',

      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      'react-hooks/set-state-in-effect': 'warn'
    },
    settings: {
      react: {
        version: 'detect'
      }
    }
  }
]);
