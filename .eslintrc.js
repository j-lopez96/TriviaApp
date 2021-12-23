module.exports = {
  extends: '@react-native-community',
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  root: true,
  rules: {
    indent: 0,
    'no-trailing-spaces': 'error',
    'no-unused-expressions': 2,
    quotes: [1, 'single'],
    semi: ['error', 'never'],
    'sort-keys': 0,
  },
}
