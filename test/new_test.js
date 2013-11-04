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
  
    var actual = grunt.file.read("tmp/one/main.js");
    var expected = grunt.file.read("test/expected/one/main.js");
    test.equal(actual, expected);
  
    actual = grunt.file.read("tmp/one/examples/one.html");
    expected = grunt.file.read("test/expected/one/examples/one.html");
    test.equal(actual, expected);
  
    test.done();
  },
  two: function(test) {
    test.expect(2);
  
    var actual = grunt.file.read("tmp/components/group/Widget/main.js"),
        expected = grunt.file.read("test/expected/components/group/Widget/main.js");
    test.equal(actual, expected);
  
    actual = grunt.file.read("tmp/components/group/Widget/examples/Widget.html");
    expected = grunt.file.read("test/expected/components/group/Widget/examples/Widget.html");
    test.equal(actual, expected);
  
    test.done();
  },
  with_args: function(test){
      test.expect(2);
  
      var actual = grunt.file.read("tmp/components/clive/hater/main.js"),
          expected = grunt.file.read("test/expected/components/clive/hater/main.js");
      test.equal(actual, expected);
      
      actual = grunt.file.read("tmp/components/clive/hater/examples/hater.html");
      expected = grunt.file.read("test/expected/components/clive/hater/examples/hater.html");
      test.equal(actual, expected);

      test.done();
  }
};
