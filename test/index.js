var spawn = require('child_process').spawn;
var Validator = require('../').Validator;

module.exports = {
  setUp: function (cb) {
    this.validator = new Validator();
    cb();
  },
  validate: {
    valid: function (test) {
      test.expect(1);

      test.doesNotThrow(function () {
        this.validator.validate({meta: {foo: 'bar'}});
      }.bind(this));

      test.done();
    },
    invalid: function (test) {
      test.expect(1);

      test.throws(function () {
        this.validator.validate({});
      }.bind(this));

      test.done();
    },
    listErrors: function (test) {
      test.expect(1);

      try {
        this.validator.validate({});
      } catch (e) {
        test.equal(e.errors[0].message, 'should have required property \'data\'', 'Unexpected error reported.');
      }

      test.done();
    }
  },
  isValid: {
    valid: function (test) {
      test.expect(1);
      test.ok(this.validator.isValid({meta: {foo: 'bar'}}), 'Valid JSON API not found.');
      test.done();
    },
    invalid: function (test) {
      test.expect(1);
      test.ok(!this.validator.isValid({}), 'Invalid JSON API not found.');
      test.done();
    }
  },
  customSchema: function (test) {
    test.expect(1);

    // NOTE: not valid JSON API, but a valid JSON schema.
    var validator = new Validator({
      type: 'object',
      required: ['hello'],
      properties: {
        hello: {
          type: 'string'
        }
      }
    });

    test.ok(validator.isValid({hello: 'world'}));
    test.done();
  }
};

