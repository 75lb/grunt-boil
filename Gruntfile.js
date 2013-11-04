/*
 * grunt-new
 * https://github.com/75lb/grunt-new
 *
 * Copyright (c) 2013 Lloyd Brookes
 * Licensed under the MIT license.
 */

"use strict";

module.exports = function(grunt) {
    grunt.initConfig({
        jshint: {
            all: [
                "Gruntfile.js",
                "tasks/*.js",
                "<%= nodeunit.tests %>",
            ],
            options: {
                jshintrc: ".jshintrc",
            },
        },

        clean: {
            tests: ["tmp"],
        },

        new: {
            one: {
                newFiles: [
                    "tmp/one/main.js",
                    "tmp/one/examples/one.html"
                ]
            },
            two: {
                options: {
                    args: ["group", "Widget"]
                },
                newFiles: [
                    "tmp/components/$1/$2/main.js",
                    "tmp/components/$1/$2/examples/$2.html"
                ]
            },
            three: {
                newFiles: [
                    "tmp/components/$1/$2/main.js",
                    "tmp/components/$1/$2/examples/$2.html"
                ]
            }
        },

        // Unit tests.
        nodeunit: {
            tests: ["test/*_test.js"]
        },

    });

    grunt.loadTasks("tasks");
    grunt.loadNpmTasks("grunt-contrib-jshint");
    grunt.loadNpmTasks("grunt-contrib-clean");
    grunt.loadNpmTasks("grunt-contrib-nodeunit");

    grunt.registerTask("with_args", function(){
        grunt.task.run("new:three:clive:hater");
    });

    grunt.registerTask("test", ["clean", "new", "with_args", "nodeunit"]);
    grunt.registerTask("default", ["jshint", "test"]);

};
