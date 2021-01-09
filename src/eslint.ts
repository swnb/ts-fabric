module.exports = {
  extends: [require.resolve("@umijs/fabric/dist/eslint")],
  rules: {
    "no-plusplus": [2, { allowForLoopAfterthoughts: true }],
    "consistent-return": 0,
    "@typescript-eslint/consistent-type-definitions": 0,
    "lines-between-class-members": 1,
    "@typescript-eslint/member-ordering": 1,
    eqeqeq: 0,
  },
}
