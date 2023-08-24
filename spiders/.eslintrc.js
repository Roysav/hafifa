module.exports = {
  env: {
    browser: true,
    node: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    sourceType: 'module',

    project: 'spiders/tsconfig.json',
  },

  extends: ['airbnb-base', 'airbnb-typescript/base'],
  overrides: [
    {
      env: {
        node: true,
      },
      files: [
        // '*.ts', '*.tsx',
        '.eslintrc.{js,cjs}',
        // "tsconfig.json"
      ],
    },
  ],
  rules: {
    'no-console': 'off',
  },
};
