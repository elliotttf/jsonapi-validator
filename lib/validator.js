'use strict';

const defaultSchema = require('./schema.json');
const Ajv = require('ajv');

const ajv = new Ajv({ allErrors: true, verbose: true });

/**
 * Validator class with an optional JSON API schema.
 * @class
 */
class Validator {
  /**
   * @constructor
   *
   * @param {*} schema
   *   (optional) An object, or path relative to __dirname for a valid JSON API
   *   schema. If one is not provided ./schema.json will be used.
   */
  constructor(schema = defaultSchema) {
    this.validator = ajv.compile(schema);
  }

  /**
   * Validation method.
   *
   * @param {object} doc
   *   A JavaScript object to validate against JSON API.
   *
   * @return {undefined}
   *
   * @throws {Error}
   *   Thrown if the document is not valid json. An additional element, errors,
   *   is added to the error object that lists the problems encountered.
   */
  validate(doc) {
    const valid = this.validator(doc);
    if (!valid) {
      const e = new Error('Invalid JSON API.');
      e.errors = this.validator.errors;
      throw e;
    }
  }

  /**
   * Boolean validation method.
   *
   * @param {object} doc
   *   A JavaScript object to validate against JSON API.
   *
   * @return {boolean}
   *   true if the document is valid, else false.
   */
  isValid(doc) {
    try {
      this.validate(doc);
    }
    catch (e) {
      return false;
    }

    return true;
  }
}

module.exports = {
  Validator,
};

