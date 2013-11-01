"use strict";

var grunt = require("grunt");

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports.new = {
  one: function(test) {
    test.expect(2);

    var actual = grunt.file.read("tmp/default/main.js");
    var expected = grunt.file.read("test/expected/default/main.js");
    test.equal(actual, expected, "should describe what the default behavior is.");

    actual = grunt.file.read("tmp/default/examples/default.html");
    expected = grunt.file.read("test/expected/default/examples/default.html");
    test.equal(actual, expected, "should describe what the default behavior is.");

    test.done();
  },
  custom_options: function(test) {
      test.expect(2);

      var actual = grunt.file.read("tmp/Widget/main.js");
      var expected = grunt.file.read("test/expected/Widget/main.js");
      test.equal(actual, expected, "should describe what the default behavior is.");

      actual = grunt.file.read("tmp/Widget/examples/Widget.html");
      expected = grunt.file.read("test/expected/Widget/examples/Widget.html");
      test.equal(actual, expected, "should describe what the default behavior is.");

      test.done();
  },
};
