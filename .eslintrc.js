module.exports = {
  extends: ['react-app'],
  rules: {
    // Use 'indent' instead of typescript-eslint
    indent: 'off',
    '@typescript-eslint/indent': ['error', 2],

    'linebreak-style': ['error', 'unix'],
    quotes: ['error', 'single'],
    semi: ['error', 'always'],

    '@typescript-eslint/prefer-interface': 'off',
    '@typescript-eslint/array-type': 'error',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-member-accessibility': [
      'error',
      { accessibility: 'no-public' }
    ],

    '@typescript-eslint/no-explicit-any': 'off'
  },
};
