# JSON API Validator

[![Build Status](https://travis-ci.org/elliotttf/jsonapi-validator.svg?branch=master)](https://travis-ci.org/elliotttf/jsonapi-validator)
[![Coverage Status](https://coveralls.io/repos/elliotttf/jsonapi-validator/badge.svg?branch=master&service=github)](https://coveralls.io/github/elliotttf/jsonapi-validator?branch=master)

Validates a JavaScript object as JSON API compliant.

## Usage

```javascript
var Validator = require('jsonapi-validator').Validator;
var validator = new Validator();

try {
  validator.validate({meta: {key: 'test'}})) {
  // valid JSON API.
}
catch (e) {
  // invalid JSON API.
}

if (validator.isValid({meta: {key: 'test'}})) {
  // valid JSON API.
}
```

### Custom schema

You may also provide a custom schema to be used for validation. Technically any valid
[json-schema](http://json-schema.org/) will be accepted, but you _should_ provide a valid
JSON API schema.

```
var customValidator = new Validator(require('./my-schema.json'));
```

## Command Line Utility

JSON API Validator can also be used on the command line by first running `npm i -g jsonapi-validator`, then executing the command line tool as follows:

```
jsonapi-validator -f /path/to/file.json
```

If the file is valid JSON API the tool will report it as such and exit with code 0.
If the file is invalid JSON API the problems will be logged to the console and the
tool will exit with code 1.

