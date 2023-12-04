module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'prettier'
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh', 'html'],
  rules: {
    "no-trailing-spaces": "error",
    "quotes": ["error", "single"],
    'max-len': ['error', { code: 80, ignoreComments: true, ignoreUrls: true }],
    'no-console': 'warn',
    'no-var': 'warn',
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
  },
}
