module.exports = {
  parser: '@typescript-eslint/parser',
  env: {
    browser: true,
    es6: true
  },
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parserOptions: {
    ecmaVersion: 2018,
    ecmaFeatures: {
      jsx: true
    },
    sourceType: 'module',
    project: './tsconfig.json'
  },
  plugins: ['@typescript-eslint', 'react'],
  extends: ['plugin:@typescript-eslint/recommended'],
  rules: {
    // Use 'indent' instead of typescript-eslint
    indent: ['error', 2],
    '@typescript-eslint/indent': 'off',

    'linebreak-style': ['error', 'unix'],
    quotes: ['error', 'single'],
    semi: ['error', 'always'],

    '@typescript-eslint/prefer-interface': 'off',
    '@typescript-eslint/array-type': 'error',
    '@typescript-eslint/explicit-function-return-type': 'off',

    '@typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/no-explicit-any': 'off'
  },
  settings: {
    react: {
      progma: 'React',
      version: 'detect'
    }
  }
};
