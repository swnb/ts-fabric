#!/usr/bin/env node
import type { Stats } from 'fs'

const fs = require('fs')
const path = require('path')

// 删除原来的配置文件
const originConfigPath = path.resolve('.', '.prettierrc')
fs.stat(originConfigPath, (err: Error | null, stats: Stats) => {
  if (err) return
  if (stats.isFile()) {
    fs.unlink(originConfigPath, () => {})
  }
})

const prettierConfigPath = path.resolve('./.prettierrc.js')
const prettierConfigContent = `
const prettier = require("@swnb/fabric/dist/prettier");

module.exports = {
  ...prettier,
};
`
fs.createWriteStream(prettierConfigPath).write(prettierConfigContent, (err: Error) => {
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
fs.createWriteStream(eslintConfigPath).write(eslintConfigContent, (err: Error) => {
  if (err) {
    console.error(`can't creat ..eslintrc in ${eslintConfigPath}`)
    return
  }

  console.log('success create .eslintrc file')
})
