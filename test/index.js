'use strict';

const Validator = require('../').Validator;

module.exports = {
  setUp(cb) {
    this.validator = new Validator();
    cb();
  },
  validate: {
    valid(test) {
      test.expect(1);

      test.doesNotThrow(() => {
        this.validator.validate({ meta: { foo: 'bar' } });
      });

      test.done();
    },
    invalid(test) {
      test.expect(1);

      test.throws(() => {
        this.validator.validate({});
      });

      test.done();
    },
    listErrors(test) {
      test.expect(1);

      try {
        this.validator.validate({});
      }
      catch (e) {
        test.equal(
          e.errors[0].message,
          'should have required property \'data\'',
          'Unexpected error reported.'
        );
      }

      test.done();
    },
  },
  isValid: {
    valid(test) {
      test.expect(1);
      test.ok(this.validator.isValid({ meta: { foo: 'bar' } }), 'Valid JSON API not found.');
      test.done();
    },
    invalid(test) {
      test.expect(1);
      test.ok(!this.validator.isValid({}), 'Invalid JSON API not found.');
      test.done();
    },
  },
  customSchema(test) {
    test.expect(1);

    // NOTE: not valid JSON API, but a valid JSON schema.
    const validator = new Validator({
      type: 'object',
      required: ['hello'],
      properties: {
        hello: {
          type: 'string',
        },
      },
    });

    test.ok(validator.isValid({ hello: 'world' }));
    test.done();
  },
};

