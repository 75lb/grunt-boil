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
            options: {
                templateData: {
                    clive: "hater",
                    args: [ "nigeria" ]
                }
            },
            package: {
                options: {
                    templateData: {
                        args: [ "widget", "something"]
                    }
                },
                create: [
                    {
                        filename: "tmp/{{args.[0]}}/examples/{{args.[0]}}.html",
                        template: "<p>docs here</p>"
                    },
                    {
                        filename: "tmp/{{args.[0]}}/examples/logo.png",
                        copy: "test/assets/logo.png"
                    },
                    {
                        filename: "tmp/{{args.[0]}}/bower.json",
                        template: {
                            "name": "{{args.[0]}}",
                            "version": "0.0.0",
                            "private": true,
                            "dependencies": {
                                "some": "1.8.1",
                                "shite": "1.8.1"
                            }
                        }
                    },
                    {
                        filename: "tmp/{{args.[0]}}/more.json",
                        template: [
                            { a: "{{args.[0]}}" },
                            { b: "{{args.[1]}}" }
                        ]
                    },
                    {
                        filename: "tmp/{{args.[0]}}/nls/{{args.[0]}}.js",
                        template: grunt.file.read("test/assets/module1.js")
                    },
                    {
                        filename: "tmp/{{args.[0]}}/main.js",
                        template: grunt.file.read("test/assets/module2.js")
                    },
                    "tmp/{{args.[0]}}/{{args.[0]}}.scss"
                ]
            },

            with_args: {
                create: [
                    {
                        filename: "tmp/{{args.[0]}}/examples/{{args.[0]}}.html",
                        template: "<p>docs here</p>"
                    },
                    {
                        filename: "tmp/{{args.[0]}}/examples/logo.png",
                        copy: "test/assets/logo.png"
                    },
                    {
                        filename: "tmp/{{args.[0]}}/bower.json",
                        template: {
                            "name": "{{args.[0]}}",
                            "version": "0.0.0",
                            "private": true,
                            "dependencies": {
                                "dojo": "1.8.1",
                                "dijit": "1.8.1"
                            }
                        }
                    },
                    {
                        filename: "tmp/{{args.[0]}}/nls/{{args.[0]}}.js",
                        template: grunt.file.read("test/assets/module1.js")
                    },
                    {
                        filename: "tmp/{{args.[0]}}/main.js",
                        template: grunt.file.read("test/assets/module2.js")
                    },
                    "tmp/{{args.[0]}}/{{args.[0]}}.scss"
                ]
            },

            index: {
                options: {
                    templateData: {
                        someFiles: grunt.file.expand("*.{js,html}")
                    },
                    helpers: "test/assets/index/list.js",
                    partials: "test/assets/index/fileCount.hbs"
                },
                create: [
                    {
                        filename: "tmp/index.html",
                        template: grunt.file.read("test/assets/index/index.hbs"),
                        templateData: {
                            word: "keele"
                        }
                    }
                ]
            },

            yaml: {
                create: {
                    filename: "tmp/yaml.html",
                    template: grunt.file.read("test/assets/yaml.hbs"),
                    
                }
            },

            taskOptions: {
                create: "tmp/{{clive}}-{{args.[0]}}.txt"
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

    grunt.registerTask("test", [
        "clean",
        "boil:package",
        "boil:with_args:clive",
        "boil:index",
        "boil:yaml",
        "nodeunit"
    ]);
    grunt.registerTask("default", ["jshint", "test"]);
};
