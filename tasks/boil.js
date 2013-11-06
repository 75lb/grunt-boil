/*
 * grunt-boil
 * https://github.com/75lb/grunt-boil
 *
 * Copyright (c) 2013 Lloyd Brookes
 * Licensed under the MIT license.
 */

"use strict";

module.exports = function(grunt) {
    var _ = require("lodash");
    
    grunt.registerMultiTask("boil", "Boilerplate new components", function(name) {
        
        function replaceArgs(file, replaceWith, index){
            var replaceToken = new RegExp("\\$" + (index + 1), "g");
            if (typeof file === "string"){
                return file.replace(replaceToken, replaceWith);
            } else {
                file.name = file.name.replace(replaceToken, replaceWith);
                
                // if (_.isPlainObject(file.content)){
                if (typeof file.content === "object"){
                    file.content = JSON.stringify(file.content, null, "    ");
                }
                
                if (typeof file.content === "string"){
                    file.content = file.content.replace(replaceToken, replaceWith);
                }
                return file;
            }
        }
        
        function createFile(file){
            if (typeof file === "string"){
                grunt.file.write(file, "");
            } else {
                if (file.copy){
                    grunt.file.copy(file.copy, file.name);
                } else {
                    grunt.file.write(file.name, file.content);
                }
            }
            grunt.log.ok("created: " + (typeof file === "string" ? file : file.name));
        }
        
        var options = this.options({
            args: Array.prototype.slice.call(arguments) || []
        });
        
        grunt.verbose.writeln("args: " + options.args.toString());

        this.data.newFiles.forEach(function(file){
            options.args.forEach(function(replaceWith, index){
                file = replaceArgs(file, replaceWith, index);
            });
            createFile(file);
        });
    });
};
