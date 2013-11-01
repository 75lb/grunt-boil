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
                    "tmp/{{=name}}/main.js",
                    "tmp/{{=name}}/examples/{{=name}}.html"
                ]
            },
            custom_options: {
                options: {
                    name: "Widget"
                },
                newFiles: [
                    "tmp/{{=name}}/main.js",
                    "tmp/{{=name}}/examples/{{=name}}.html"
                ]
            },
        },

        // Unit tests.
        nodeunit: {
            tests: ["test/*_test.js"],
        },

    });

    // Actually load this plugin"s task(s).
    grunt.loadTasks("tasks");

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks("grunt-contrib-jshint");
    grunt.loadNpmTasks("grunt-contrib-clean");
    grunt.loadNpmTasks("grunt-contrib-nodeunit");

    // Whenever the "test" task is run, first clean the "tmp" dir, then run this
    // plugin"s task(s), then test the result.
    grunt.registerTask("test", ["clean", "new", "nodeunit"]);

    // By default, lint and run all tests.
    grunt.registerTask("default", ["jshint", "test"]);

};
