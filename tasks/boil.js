/*
 * grunt-boil
 * https://github.com/75lb/grunt-boil
 *
 * Copyright (c) 2013 Lloyd Brookes
 * Licensed under the MIT license.
 */

"use strict";

module.exports = function(grunt) {
    grunt.registerMultiTask("boil", "Boilerplate new components", function(name) {
        
        function replaceArgs(file, replaceWith, index){
            var replaceToken = new RegExp("\\$" + (index + 1), "g");
            file.name = file.name.replace(replaceToken, replaceWith);
            
            if (typeof file.content === "object"){
                file.content = JSON.stringify(file.content, null, "    ");
            }
            
            if (typeof file.content === "string"){
                file.content = file.content.replace(replaceToken, replaceWith);
            }
            return file;
        }
        
        function createFile(file){
            if (file.copy){
                grunt.file.copy(file.copy, file.name);
            } else {
                grunt.file.write(file.name, file.content);
            }
            grunt.log.ok("created: " + (typeof file === "string" ? file : file.name));
        }
        
        var options = this.options({ data:{ } });
        if (!options.args){
            options.args = Array.prototype.slice.call(arguments) || [];
        }
        grunt.verbose.writeln("options: ", JSON.stringify(options, null, "    "));

        if (!Array.isArray(this.data.create)){
            this.data.create = [ this.data.create ];
        }
        this.data.create.forEach(function(file){
            if (typeof file === "string"){
                file = { name: file, content: "" };
            }
            grunt.verbose.writeln("file: ", JSON.stringify(file, null, "    "));
            options.args.forEach(function(replaceWith, index){
                file = replaceArgs(file, replaceWith, index);
            });
            createFile(file);
        });
    });
};
