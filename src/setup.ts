#!/usr/bin/env node
import type { Stats } from 'fs'

const fs = require('fs')
const path = require('path')

let isAutomaticCall = false

let currentWorkDirPath = process.argv[2]
if (!currentWorkDirPath) {
  isAutomaticCall = true
  currentWorkDirPath = '.'
}

// 删除原来的配置文件

function removeFile(file: string) {
  const originConfigPath = path.resolve(currentWorkDirPath, file)
  fs.stat(originConfigPath, (err: Error | null, stats: Stats) => {
    if (err) return
    if (stats.isFile()) {
      fs.unlink(originConfigPath, (unlinkError: Error | null) => {
        if (unlinkError) return
        console.log('delete .prettierrc')
      })
    }
  })
}

;['.prettierrc'].forEach(file => {
  removeFile(file)
})

const prettierConfigPath = path.resolve(currentWorkDirPath, '.prettierrc.js')
const prettierConfigContent = `
const prettier = require("@swnb/fabric/dist/prettier");

module.exports = {
  ...prettier,
};
`

if (!fs.existsSync(prettierConfigPath) || !isAutomaticCall) {
  fs.createWriteStream(prettierConfigPath).write(prettierConfigContent, (err: Error | null) => {
    if (err) {
      console.error(`can't creat .prettierrc.js in ${prettierConfigPath}`)
      return
    }

    console.log('success create .prettierrc.js file')
  })
}

const eslintConfigPath = path.resolve(currentWorkDirPath, '.eslintrc')
const eslintConfigContent = `
{
  "extends": "./node_modules/@swnb/fabric/dist/eslint"
}
`

if (!fs.existsSync(eslintConfigPath) || !isAutomaticCall) {
  fs.createWriteStream(eslintConfigPath).write(eslintConfigContent, (err: Error | null) => {
    if (err) {
      console.error(`can't creat ..eslintrc in ${eslintConfigPath}`)
      return
    }

    console.log('success create .eslintrc file')
  })
}
