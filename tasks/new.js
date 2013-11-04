/*
 * grunt-new
 * https://github.com/75lb/grunt-new
 *
 * Copyright (c) 2013 Lloyd Brookes
 * Licensed under the MIT license.
 */

"use strict";

module.exports = function(grunt) {
    grunt.registerMultiTask("new", "Boilerplate new file and directory structures", function(name) {
        var options = this.options({
            args: Array.prototype.slice.call(arguments) || []
        });
        
        grunt.verbose.writeln("args: " + options.args.toString());

        this.data.newFiles.forEach(function(file){
            options.args.forEach(function(value, index){
                var replaceToken = new RegExp("\\$" + (index + 1), "g");
                file = file.replace(replaceToken, value);
            });
            grunt.file.write(file, "");
            grunt.log.ok("created: " + file);
        });
    });
};
