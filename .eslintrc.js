module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:prettier/recommended',
  ],
  overrides: [
    {
      env: {
        node: true,
      },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react'],
  rules: {
    'react/display-name': 'off',
    'prefer-const': 'warn',
    'react/react-in-jsx-scope': 'off',
    'react/jsx-key': 'warn',
    'react/prop-types': 'warn',
    'prettier/prettier': ['off', { endOfline: 'crlf' }],
    curly: 'off',
    'max-depth': ['warn', 4],
    'no-empty': 'warn',
    'no-unused-vars': 'warn',
    'id-length': ['warn', { exceptions: ['i', 'j', 'e'], min: 2 }],
    'no-plusplus': ['warn', { allowForLoopAfterthoughts: true }],
    'no-restricted-syntax': 'off',
    'no-constant-condition': 'warn',
    'no-unreachable': 'warn',
    'no-case-declarations': 'off',
  },
};

