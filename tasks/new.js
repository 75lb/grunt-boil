/*
 * grunt-new
 * https://github.com/Lloyd/grunt-new
 *
 * Copyright (c) 2013 Lloyd Brookes
 * Licensed under the MIT license.
 */

"use strict";

module.exports = function(grunt) {
    grunt.registerMultiTask("new", "Boilerplate new component file and directory structures", function(name) {
        console.log(this.options());
        var options = this.options({
            name: name || "default"
        });
        console.log(options);

        grunt.template.addDelimiters("mustache", "{{", "}}");
        var templateOptions = {
            data: options,
            delimiters: "mustache"
        };

        this.data.newFiles.forEach(function(file){
            file = grunt.template.process(file, templateOptions);
            grunt.file.write(file, "");
            grunt.log.ok("created: " + file);
        });
    });
};
