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
            // options: {
            //     templateData: {
            //         clive: "hater",
            //         args: [ "nigeria" ],
            //         one: "task",
            //         two: "task",
            //         three: "task",
            //         four: "task"
            //     }
            // },
            // index: {
            //     options: {
            //         templateData: {
            //             someFiles: grunt.file.expand("*.{js,html}")
            //         },
            //         helpers: "test/assets/index/list.js",
            //         partials: "test/assets/index/fileCount.hbs"
            //     },
            //     create: [
            //         {
            //             filename: "tmp/index.html",
            //             template: grunt.file.read("test/assets/index/index.hbs"),
            //             templateData: {
            //                 word: "keele"
            //             }
            //         }
            //     ]
            // },
            // 
            // yaml: {
            //     create: {
            //         filename: "tmp/yaml.html",
            //         template: grunt.file.read("test/assets/yaml.hbs"),
            //         
            //     }
            // },
            // 
            // taskOptions: {
            //     create: "tmp/{{clive}}-{{args.[0]}}.txt"
            // },
            
            emptyFile: {
                dest: "tmp/emptyFile.txt"
            },
            simpleFile: {
                src: "test/src/simpleFile.txt",
                dest: "tmp/simpleFile.txt"
            },
            simpleFileBinary: {
                copy: "test/src/logo.png",
                dest: "tmp/logo.png"
            },
            allThree: {
                files: [
                    { dest: "tmp/all3/emptyFile.txt" },
                    { src: "test/src/simpleFile.txt", dest: "tmp/all3/simpleFile.txt" },
                    { copy: "test/src/logo.png", dest: "tmp/all3/logo.png" }
                ]
            },
            // withArgs: {
            //     dest: "tmp/{{args.[0]}}/{{args.[1]}}.txt"
            // },
            // withArgsCopy: {
            //     copy: "test/src/{{args.[0]}}.png",
            //     dest: "tmp/{{args.[1]}}.png"
            // },
            optionsInMapping: {
                src: "test/src/optionsIn.hbs",
                dest: "tmp/optionsInMapping.txt",
                data: {
                    word: "mapping",
                    phrase: "mapping"
                }
            },
            optionsInTarget: {
                options: {
                    data: {
                        word: "target",
                        phrase: "target"
                    }
                },
                src: "test/src/optionsIn.hbs",
                dest: "tmp/optionsInTarget.txt"
            },
            options: {
                data: {
                    word: "task",
                    phrase: "task"
                }
            },
            optionsInTask: {
                src: "test/src/optionsIn.hbs",
                dest: "tmp/optionsInTask.txt"
            },
            optionsInSrc: {
                src: "test/src/optionsInSrc.hbs",
                dest: "tmp/optionsInSrc.txt"
            },
            multipleSrc: {}
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
