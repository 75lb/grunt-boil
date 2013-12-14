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

exports.boil = {
    package: function(test){
        test.expect(7);
      
        var actual = grunt.file.read("tmp/widget/examples/widget.html"),
            expected = grunt.file.read("test/expected/widget/examples/widget.html");
        test.equal(actual, expected);

        actual = grunt.file.read("tmp/widget/examples/logo.png", { encoding: null });
        expected = grunt.file.read("test/assets/logo.png", { encoding: null });
        test.deepEqual(actual, expected);
       
        actual = grunt.file.read("tmp/widget/bower.json");
        expected = grunt.file.read("test/expected/widget/bower.json");
        test.equal(actual, expected);

        actual = grunt.file.read("tmp/widget/more.json");
        expected = grunt.file.read("test/expected/widget/more.json");
        test.equal(actual, expected);

        actual = grunt.file.read("tmp/widget/nls/widget.js");
        expected = grunt.file.read("test/expected/widget/nls/widget.js");
        test.equal(actual, expected);

        actual = grunt.file.read("tmp/widget/main.js");
        expected = grunt.file.read("test/expected/widget/main.js");
        test.equal(actual, expected);

        actual = grunt.file.read("tmp/widget/widget.scss");
        expected = grunt.file.read("test/expected/widget/widget.scss");
        test.equal(actual, expected);
        
        test.done();
    },
    
    index: function(test){
        test.expect(1);
        var actual = grunt.file.read("tmp/index.html"),
            expected = grunt.file.read("test/expected/index.html");
        test.equal(actual, expected);
        test.done();
    },
    
    yaml: function(test){
        test.expect(1);
        var actual = grunt.file.read("tmp/yaml.html"),
            expected = grunt.file.read("test/expected/yaml.html");
        test.equal(actual, expected);
        test.done();
    }
};
