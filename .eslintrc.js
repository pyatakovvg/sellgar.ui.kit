module.exports = [
  {
    parser: '@typescript-eslint/parser',
    parserOptions: {
      ecmaVersion: 'latest',
      project: 'tsconfig.json',
      tsconfigRootDir: __dirname,
      sourceType: 'module',
      ecmaFeatures: {
        arrowFunctions: true,
      },
    },
    plugins: ['@typescript-eslint/eslint-plugin', 'eslint-plugin-storybook'],
    extends: ['plugin:@typescript-eslint/recommended', 'plugin:prettier/recommended'],
    ignorePatterns: ['.eslintrc.js'],
    rules: {
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/no-var-requires': 'off',
      '@typescript-eslint/interface-name-prefix': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/ban-types': [
        'off',
        {
          extendDefaults: true,
          types: { '{}': false },
        },
      ],
    },
  },
];
