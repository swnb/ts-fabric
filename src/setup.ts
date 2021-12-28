#!/usr/bin/env node

import type { Stats } from 'fs'

const fs = require('fs')
const path = require('path')
const debug = require('debug')('@swnb/fabric/setup')

let isAutomaticCall = false

let currentWorkDirPath = process.argv[2]
if (currentWorkDirPath) {
  isAutomaticCall = true
} else {
  currentWorkDirPath = '.'
}

debug('process argv', process.argv)
debug('currentWorkDirPath', currentWorkDirPath)

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

debug(`isAutomaticCall -> ${isAutomaticCall}`)
debug(`${prettierConfigPath} exists -> ${fs.existsSync(prettierConfigPath)}`)
if (!fs.existsSync(prettierConfigPath) || !isAutomaticCall) {
  debug(`start write ${prettierConfigPath}`)
  fs.createWriteStream(prettierConfigPath).write(prettierConfigContent, (err: Error | null) => {
    if (err) {
      console.error(`can't create .prettierrc.js in ${prettierConfigPath}`)
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

debug(`${eslintConfigContent} exists -> ${fs.existsSync(eslintConfigContent)}`)
if (!fs.existsSync(eslintConfigPath) || !isAutomaticCall) {
  debug(`start write ${eslintConfigPath}`)
  fs.createWriteStream(eslintConfigPath).write(eslintConfigContent, (err: Error | null) => {
    if (err) {
      console.error(`can't create ..eslintrc in ${eslintConfigPath}`)
      return
    }

    console.log('success create .eslintrc file')
  })
}
