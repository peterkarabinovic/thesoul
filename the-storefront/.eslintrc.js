module.exports = {
  extends: [
    'next', 
    'prettier',
    'eslint:recommended', 
    'plugin:@typescript-eslint/recommended',
    'plugin:storybook/recommended'],
  plugins: ['unicorn', '@typescript-eslint'],
  rules: {
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": "error",
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
