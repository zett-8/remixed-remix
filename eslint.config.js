import tsEslint from 'typescript-eslint'
import eslintJS from '@eslint/js'
import { FlatCompat } from '@eslint/eslintrc'
import globals from 'globals'
import reactPlugin from 'eslint-plugin-react'
import reactHooksPlugin from 'eslint-plugin-react-hooks'
import a11yPlugin from 'eslint-plugin-jsx-a11y'
import importPlugin from 'eslint-plugin-import'

const compat = new FlatCompat()

export default tsEslint.config(
  eslintJS.configs.recommended,
  ...tsEslint.configs.recommended,
  {
    ignores: ['!**/.server', '!**/.client', 'build', '.wrangler', 'public'],
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
      'import/internal-regex': '^~/',
      'import/resolver': {
        node: {
          extensions: ['.ts', '.tsx'],
        },
        typescript: {
          alwaysTryTypes: true,
        },
      },
    },
  }
)
