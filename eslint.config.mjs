import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  {
    ignores: ['src/app/(payload)/**/*'],
    rules: {
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],
      curly: 'error',
      'import/order': [
        'error',
        {
          alphabetize: {
            order: 'ignore',
            orderImportKind: 'ignore',
          },
          groups: [['external', 'builtin']],
          'newlines-between': 'always',
        },
      ],
      'jsx-a11y/anchor-is-valid': 'off',
      'no-console': 'error',
      'prefer-const': ['error', {}],
      'react/jsx-handler-names': [
        'error',
        {
          eventHandlerPrefix: 'on',
          eventHandlerPropPrefix: 'on',
        },
      ],
      'react/jsx-no-target-blank': 'error',
      'react/jsx-no-useless-fragment': 'error',
      'react/jsx-sort-props': [
        'error',
        {
          ignoreCase: true,
          reservedFirst: true,
        },
      ],
      'react/no-danger': 'error',
      'react/no-deprecated': 'error',
      'react/no-typos': 'error',
      'react/no-unknown-property': 'error',
      'react/no-unsafe': [
        'error',
        {
          checkAliases: true,
        },
      ],
      'react/no-unused-prop-types': 'error',
      'react/prefer-stateless-function': 'error',
      'react/prop-types': 'off',
      'react/react-in-jsx-scope': 'off',
      'react-hooks/exhaustive-deps': 'off',
      'react/self-closing-comp': [
        'error',
        {
          component: true,
          html: true,
        },
      ],
      'sort-vars': 'error',
    },
  },
  {
    ignores: ['.next/'],
  },
];

export default eslintConfig;
