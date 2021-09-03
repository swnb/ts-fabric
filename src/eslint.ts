import baseConfigs from './umi-eslint-config'

module.exports = {
  ...baseConfigs,
  rules: {
    ...baseConfigs.rules,
    eqeqeq: 0,
    'no-plusplus': [2, { allowForLoopAfterthoughts: true }],
    'consistent-return': 0,
    '@typescript-eslint/consistent-type-definitions': 0,
    'lines-between-class-members': 1,
    '@typescript-eslint/member-ordering': 1,
    'no-constant-condition': ['error', { checkLoops: false }],
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    'no-sequences': [1, { allowInParentheses: false }],
    'no-empty': ['error', { allowEmptyCatch: true }],
  },
}
