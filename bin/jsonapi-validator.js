#! /usr/bin/env node

/* eslint-disable no-console */

'use strict';

const fs = require('fs');
const path = require('path');
const Validator = require('../').Validator;

const argv = require('yargs')
  .usage('Usage: $0 -f [file] [-q]')
  .demand(['f'])
  .alias('f', 'file')
  .describe('f', 'The file to validate')
  .normalize('f')
  .alias('q', 'queit')
  .describe('q', 'Suppress output and exit with 1 if the source file is not valid.')
  .boolean('q')
  .help('h')
  .alias('h', 'help')
  .argv;

const v = new Validator();

try {
  const file = JSON.parse(fs.readFileSync(path.resolve(argv.f)));
  v.validate(file);
}
catch (e) {
  if (!argv.q) {
    console.error(e.message);
    e.errors.forEach((message) => {
      console.error(`  ${message.message}.`);
      console.error(`  schemaPath: ${message.schemaPath}`);
      Object.keys(message.params).forEach(param => console.error(
        `  ${param}: ${message.params[param]}`));
    });
  }
  process.exit(1);
}

if (!argv.q) {
  console.log(`${argv.f} is valid JSON API.`);
}

