#!/usr/bin/env node

import { spawn } from 'child_process'
import { glob } from 'glob'

// Parse CLI arguments
const args = process.argv.slice(2)
const testFiles = args.filter(arg => !arg.startsWith('--'))

const options = {
  headless: !args.includes('--headed'),
  slowMo: 0
}

// Handle --slomo=xx
const slomoArg = args.find(arg => arg.startsWith('--slomo='))
if (slomoArg) {
  const [, value] = slomoArg.split('=')
  const parsed = parseInt(value, 10)
  if (!isNaN(parsed)) options.slowMo = parsed
}

// Require at least one test pattern
if (testFiles.length === 0) {
  console.error('No test files specified.\nUsage: tappr [options] test/**/*.test.js')
  process.exit(1)
}

// Glob match all patterns
const matchedFiles = (
  await Promise.all(testFiles.map(pattern => glob(pattern)))
).flat()

if (matchedFiles.length === 0) {
  console.error('No test files matched your pattern(s).')
  process.exit(1)
}

// Run each matched file
let failed = false
let completed = 0

for (const file of matchedFiles) {
  const proc = spawn('node', [file], {
    stdio: 'inherit',
    env: {
      ...process.env,
      HEADLESS: options.headless ? 'true' : 'false',
      SLOMO: String(options.slowMo)
    }
  })

  proc.on('exit', code => {
    if (code !== 0) failed = true
    completed++
    if (completed === matchedFiles.length) {
      process.exit(failed ? 1 : 0)
    }
  })
}
