module.exports = {
  extends: ['stylelint-config-standard-scss'],
  plugins: ['stylelint-prettier', 'stylelint-scss'],
  customSyntax: 'postcss-scss',
  rules: {
    'prettier/prettier': true,

    'at-rule-no-unknown': null,
    'at-rule-empty-line-before': 'newer',
    'import-notation': 'string',
    'media-feature-range-notation': 'prefix',
    "no-duplicate-selectors": true,

    'scss/at-rule-no-unknown': true,
    'scss/dollar-variable-pattern': '^[a-z]+([a-z0-9-]+[a-z0-9]+)?$',
    'scss/load-partial-extension': 'always',
    'scss/at-use-no-redundant-alias': true,
    'rule-empty-line-before': ['always', { except: ['first-nested'] }],

    // Отключаем ненужные проверки
    'custom-property-pattern': null,
    'selector-class-pattern': null,
    'no-descending-specificity': null,
  },
  ignoreFiles: ['**/*.css', '**/*.ts', '**/*.tsx', '**/*.json', 'build/**', 'dist/**', 'node_modules/**'],
};
