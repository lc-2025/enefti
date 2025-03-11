module.exports = {
  root: true,
  extends: [
    'next/core-web-vitals',
    'prettier',
    'stylelint-config-standard-scss',
    'stylelint-config-prettier-scss',
  ],
  plugins: ['@typescript-eslint'],
  rules: {
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
        'prettier',
      ],
    },
  ],
};
