module.exports = {
  root: true,
  extends: [
    'next/core-web-vitals',
    'tailwindcss',
    'prettier',
    'stylelint-config-standard-scss',
    'stylelint-config-prettier-scss',
  ],
  plugins: ['@typescript-eslint', 'tailwindcss'],
  rules: {
    'tailwindcss/classnames-order': 'off',
    'selector-class-pattern': null,
  },
  parser: '@typescript-eslint/parser',
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      parserOptions: {
        project: ['./tsconfig.json'],
        projectService: true,
        tsconfigRootDir: __dirname,
      },
      extends: [
        'next/core-web-vitals',
        'plugin:@typescript-eslint/recommended',
        'plugin:tailwindcss/recommended',
        'prettier',
      ],
      rules: {
        'tailwindcss/classnames-order': 'off',
      },
    },
  ],
};
