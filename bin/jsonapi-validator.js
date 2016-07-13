#! /usr/bin/env node

var fs = require('fs');
var path = require('path');
var Validator = require('../').Validator;

var argv = require('yargs')
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

var v = new Validator();
var file = require(path.resolve(argv.f));

try {
  v.validate(file);
}
catch (e) {
  if (!argv.q) {
    console.error(e.message);
    e.errors.forEach(function (message) {
      console.error('  ' + message.message + '.');
      console.error('  schemaPath: ' + message.schemaPath);
      for (param in message.params) {
        if (!message.params.hasOwnProperty(param)) {
          return;
        }
        console.error('  ' + param + ': ' + message.params[param]);
      }
    });
  }
  process.exit(1);
}

if (!argv.q) {
  console.log(argv.f + ' is valid JSON API.');
}

