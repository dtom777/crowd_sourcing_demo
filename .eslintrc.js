module.exports = {
  plugins: ['unused-imports', 'import'],
  extends: ['next', 'next/core-web-vitals', 'prettier'],
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true, // always try to resolve types under `<root>@types` directory even it doesn't contain any source code, like `@types/unist`
        project: './',
      },
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
  rules: {
    '@typescript-eslint/no-unused-vars': 'off',
    'unused-imports/no-unused-imports': 'warn',
    semi: 'error',
    'import/prefer-default-export': 'off',
    'newline-before-return': 'error',
    'no-console': 'warn',
    'no-var': 'error',
    'import/order': [
      'error',
      {
        groups: [
          'builtin',
          'external',
          'internal',
          ['parent', 'sibling'],
          'object',
          'type',
          'index',
        ],
        'newlines-between': 'always',
        pathGroupsExcludedImportTypes: ['builtin'],
        alphabetize: { order: 'asc', caseInsensitive: true },
        pathGroups: [
          { pattern: '@/stores/**', group: 'internal', position: 'before' },
          { pattern: '@/libs/**', group: 'internal', position: 'before' },
          { pattern: '@/hooks/**', group: 'internal', position: 'before' },
          {
            pattern: '@/components/**',
            group: 'internal',
            position: 'before',
          },
          {
            pattern: '@/constants/**',
            group: 'internal',
            position: 'before',
          },
          { pattern: './**.module.css', group: 'index', position: 'before' },
        ],
      },
    ],
  },
  // overrides: [
  //   // Only uses Testing Library lint rules in test files
  //   {
  //     files: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
  //     extends: ['plugin:testing-library/react'],
  //   },
  // ],
};
