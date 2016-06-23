var Ajv = require('ajv');
var ajv = new Ajv({allErrors: true, verbose: true})

/**
 * Validator class with an optional JSON API schema.
 *
 * @param {*} schema
 *   (optional) An object, or path relative to __dirname for a valid JSON API
 *   schema. If one is not provided ./schema.json will be used.
 */
var Validator = function (schema) {
  if (typeof schema === 'undefined') {
    schema = require('./schema.json');
  }

  this._validate = ajv.compile(schema);
};

/**
 * Validation method.
 *
 * @param {object} doc
 *   A JavaScript object to validate against JSON API.
 *
 * @throws {Error}
 *   Thrown if the document is not valid json. An additional element, errors,
 *   is added to the error object that lists the problems encountered.
 */
Validator.prototype.validate = function (doc) {
  var valid = this._validate(doc);
  if (!valid) {
    var e = new Error('Invalid JSON API.');
    e.errors = this._validate.errors;
    throw e;
  }
};

/**
 * Boolean validation method.
 *
 * @param {object} doc
 *   A JavaScript object to validate against JSON API.
 *
 * @return {boolean}
 *   true if the document is valid, else false.
 */
Validator.prototype.isValid = function (doc) {
  try {
    this.validate(doc);
  } catch (e) {
    return false;
  }

  return true;
};

module.exports = {
  Validator: Validator
};

