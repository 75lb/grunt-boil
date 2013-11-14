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
        var handlebars = require("handlebars"),
            path = require("path"),
            options = this.options({ grunt: grunt, helpers: [] });

        if (!options.args){
            options.args = Array.prototype.slice.call(arguments) || [];
        }
        
        if (typeof options.helpers === "string"){
            options.helpers = [ options.helpers ];
        }
        options.helpers.forEach(function(helper){
            require(path.resolve(process.cwd(), helper))(handlebars);
        });
        
        function normaliseFile(file){
            if (typeof file === "string"){
                file = { name: file, content: "" };
            } else if (typeof file.content === "object"){
                file.content = JSON.stringify(file.content, null, "    ");
            }
            return file;
        }
        
        function replaceArgs(input, replaceWith, index){
            var replaceToken = new RegExp("\\$" + (index + 1), "g");
            return input.replace(replaceToken, replaceWith);
        }
        
        function createFile(file){
            if (file.copy){
                grunt.file.copy(file.copy, file.name);
            } else {
                var template = handlebars.compile(file.content);
                grunt.file.write(file.name, template(options));
            }
            grunt.log.ok("created: " + (typeof file === "string" ? file : file.name));
        }
        
        if (!Array.isArray(this.data.create)){
            this.data.create = [ this.data.create ];
        }
        this.data.create.forEach(function(file){
            file = normaliseFile(file);
            grunt.verbose.writeln("file: ", JSON.stringify(file, null, "    "));
            options.args.forEach(function(replaceWith, index){
                file.name = replaceArgs(file.name, replaceWith, index);
                if (file.content) {
                    file.content = replaceArgs(file.content, replaceWith, index);
                }
            });
            createFile(file);
        });
    });
};
