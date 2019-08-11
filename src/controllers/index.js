#!/usr/bin/env node

let cli = require('yargs')

cli
  .commandDir('check')
  .commandDir('fix')
  .help().argv
