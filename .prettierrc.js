/** @format */

module.exports = {
  singleQuote: true,
  jsxSingleQuote: true,
  trailingComma: 'all',
  printWidth: 100,
  semi: false,
  useTabs: false,
  bracketSpacing: true,
  jsxBracketSameLine: false,
  arrowParens: 'avoid',
  endOfLine: 'lf',
  overrides: [
    {
      files: '.prettierrc',
      options: {
        parser: 'json',
      },
    },
    {
      files: 'document.ejs',
      options: {
        parser: 'html',
      },
    },
  ],
}
