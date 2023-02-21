module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
    jest: true,
  },
  parser: '@typescript-eslint/parser',
  plugins: ['react-hooks', '@typescript-eslint', 'import'],
  extends: [
    'next/core-web-vitals',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'plugin:react-hooks/recommended',
    'plugin:import/warnings',
    // 'plugin:import/typescript',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 13,
    sourceType: 'module',
  },
  ignorePatterns: ['/**/*.cjs'],
  rules: {
    'no-console': 'warn',
    'react/jsx-use-react': 'off',
    'react/react-in-jsx-scope': 'off',
    'import/extension': 'off',
    'import/no-anonymous-default-export': [
      'error',
      {
        allowAnonymousFunction: true,
      },
    ],
    'import/no-named-as-default-member': 'off',
    'import/no-named-as-default': 'off',
    '@typescript-eslint/ban-ts-ignore': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
  },
  overrides: [
    {
      files: ['*.test.*', '*.stories.*'],
      rules: {
        'no-console': 'off',
      },
    },
  ],
}
