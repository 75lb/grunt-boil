/*
 * grunt-boil
 * https://github.com/75lb/grunt-boil
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

        boil: {
            package: {
                options: {
                    args: [ "widget", "something"]
                },
                newFiles: [
                    { 
                        name: "tmp/$1/examples/$1.html",
                        content: "<p>docs here</p>"
                    },
                    { 
                        name: "tmp/$1/examples/logo.png",
                        copy: "test/assets/logo.png"
                    },
                    {
                        name: "tmp/$1/bower.json",
                        content: {
                            "name": "$1",
                            "version": "0.0.0",
                            "private": true,
                            "dependencies": {
                                "dojo": "1.8.1",
                                "dijit": "1.8.1"
                            }
                        }
                    },
                    {
                        name: "tmp/$1/more.json",
                        content: [
                            { a: "$1" },
                            { b: "$2" }
                        ]
                    },
                    { 
                        name: "tmp/$1/nls/$1.js",
                        content: grunt.file.read("test/assets/module1.js")
                    },
                    { 
                        name: "tmp/$1/main.js",
                        content: grunt.file.read("test/assets/module2.js")
                    },
                    "tmp/$1/$1.scss"
                ]
            },
            
            with_args: {
                newFiles: [
                    { 
                        name: "tmp/$1/examples/$1.html",
                        content: "<p>docs here</p>"
                    },
                    { 
                        name: "tmp/$1/examples/logo.png",
                        copy: "test/assets/logo.png"
                    },
                    {
                        name: "tmp/$1/bower.json",
                        content: {
                            "name": "$1",
                            "version": "0.0.0",
                            "private": true,
                            "dependencies": {
                                "dojo": "1.8.1",
                                "dijit": "1.8.1"
                            }
                        }
                    },
                    { 
                        name: "tmp/$1/nls/$1.js",
                        content: grunt.file.read("test/assets/module1.js")
                    },
                    { 
                        name: "tmp/$1/main.js",
                        content: grunt.file.read("test/assets/module2.js")
                    },
                    "tmp/$1/$1.scss"
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
        grunt.task.run("boil:with_args:clive");
    });

    grunt.registerTask("copy", function(){
        // grunt.file.write("copy.png", grunt.file.read("test/assets/logo.png", { encoding: null }));
        grunt.file.copy("test/assets/logo.png", "clive.png");
    });

    grunt.registerTask("test", ["clean", "boil:package", "with_args", "nodeunit"]);
    grunt.registerTask("default", ["jshint", "test"]);

};
