#!/usr/bin/env node
import fs from 'fs'
import path from 'path'

const prettierConfigPath = path.resolve('./.prettierrc.js')
const prettierConfigContent = `
const fabric = require('@swnb/fabric/dist/prettier');

module.exports = {
  ...fabric.prettier,
};
`
fs.createWriteStream(prettierConfigPath).write(prettierConfigContent, err => {
  if (err) {
    console.error(`can't creat .prettierrc.js in ${prettierConfigPath}`)
    return
  }

  console.log('success create .prettierrc.js file')
})

const eslintConfigPath = path.resolve('./.eslintrc')
const eslintConfigContent = `
{
  "extends": "./node_modules/@swnb/fabric/dist/eslint"
}
`
fs.createWriteStream(eslintConfigPath).write(eslintConfigContent, err => {
  if (err) {
    console.error(`can't creat ..eslintrc in ${eslintConfigPath}`)
    return
  }

  console.log('success create .eslintrc file')
})
