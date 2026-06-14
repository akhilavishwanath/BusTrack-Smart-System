import js from '@eslint/js';
import { defineConfig } from 'eslint/config';
import pluginReact from 'eslint-plugin-react';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],

    plugins: {
      react: pluginReact,
    },

    extends: [js.configs.recommended, ...tseslint.configs.recommended],

    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,

        React: 'readonly',
        describe: 'readonly',
        test: 'readonly',
        expect: 'readonly',
        process: 'readonly',
        require: 'readonly',
      },
    },

    settings: {
      react: {
        version: 'detect',
      },
    },

    rules: {
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      '@typescript-eslint/no-require-imports': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      'no-undef': 'off',
    },
  },
]);
