module.exports = {
  root: true,
  extends: '@arcblock/eslint-config',
  globals: {
    logger: true,
  },
  rules: {
    'no-plusplus': 0,
    'no-unused-expressions': 'off',
    '@typescript-eslint/no-unused-expressions': 0,
    'no-unused-vars': 1,
    'no-undef': 'error',
    'import/prefer-default-expor': 0,
    'react/prop-types': 1,
    'react-hooks/exhaustive-deps': 'off',
    'import/prefer-default-export': 1,
  },
};
