module.exports = {
  extends: ['next', 'prettier', 'plugin:storybook/recommended'],
  plugins: ['unicorn'],
  rules: {
    'no-unused-vars': [
      'error',
      {
        args: 'after-used',
        caughtErrors: 'none',
        ignoreRestSiblings: true,
        vars: 'all'
      }
    ],
    'prefer-const': 'error',
    'react-hooks/exhaustive-deps': 'error',
    'unicorn/filename-case': [
      'error',
      {
        case: 'kebabCase'
      }
    ]
  }
};
