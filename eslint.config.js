import { FlatCompat } from '@eslint/eslintrc'
import eslintJS from '@eslint/js'
import importPlugin from 'eslint-plugin-import'
import a11yPlugin from 'eslint-plugin-jsx-a11y'
import reactPlugin from 'eslint-plugin-react'
import reactHooksPlugin from 'eslint-plugin-react-hooks'
import globals from 'globals'
import tsEslint from 'typescript-eslint'

const compat = new FlatCompat()

export default tsEslint.config(
  eslintJS.configs.recommended,
  tsEslint.configs.recommended,
  {
    ignores: ['build', '.wrangler', 'public', '.react-router'],
  },
  {
    languageOptions: {
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: {
          jsx: true,
        },
        sourceType: 'module',
      },
      globals: {
        ...globals.browser,
        ...globals.commonjs,
        ...globals.es2020,
      },
    },
  },
  // React
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    extends: [
      ...compat.config(reactPlugin.configs.recommended),
      ...compat.config(reactPlugin.configs['jsx-runtime']),
      ...compat.config(reactHooksPlugin.configs.recommended),
      ...compat.config(a11yPlugin.configs.recommended),
    ],
    settings: {
      react: {
        version: 'detect',
      },
      formComponents: ['Form'],
      linkComponents: [
        { name: 'Link', linkAttribute: 'to' },
        { name: 'NavLink', linkAttribute: 'to' },
      ],
      'import/resolver': {
        typescript: {},
      },
    },
  },
  // Typescript
  {
    files: ['**/*.{ts,tsx}'],
    extends: [...compat.config(importPlugin.configs.recommended)],
    settings: {
      'import/internal-regex': ['^~/', '^@/'],
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true,
          project: ['./tsconfig.json', './tsconfig.cloudflare.json', './tsconfig.node.json'],
        },
        node: {
          extensions: ['.ts', '.tsx'],
        },
      },
    },
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],
    },
  }
)
