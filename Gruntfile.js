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
            options: {
                data: {
                    one: "task",
                    two: "task",
                    three: "task",
                    four: "task"
                }
            },
            optionsInTask: {
                src: "test/src/optionsIn.hbs",
                dest: "tmp/optionsInTask.txt"
            },
            optionsInTarget: {
                options: {
                    data: {
                        one: "target",
                        two: "target",
                        three: "target"
                    }
                },
                src: "test/src/optionsIn.hbs",
                dest: "tmp/optionsInTarget.txt"
            },
            optionsInMapping: {
                options: {
                    data: {
                        one: "target",
                        two: "target",
                        three: "target",
                        four: "target"
                    }
                },
                files: [{
                    src: "test/src/optionsIn.hbs",
                    dest: "tmp/optionsInMapping.txt",
                    data: {
                        one: "mapping",
                        two: "mapping",
                        three: "mapping"
                    }
                }]
            },
            optionsInSrc: {
                src: "test/src/optionsInSrc.hbs",
                dest: "tmp/optionsInSrc.txt",
                data: {
                    one: "mapping",
                    two: "mapping",
                    three: "mapping"
                }
            },
            optionsInSrc2: {
                files: [{
                    src: "test/src/optionsInSrc.hbs",
                    dest: "tmp/optionsInSrc2.txt",
                    data: {
                        one: "mapping",
                        two: "mapping",
                        three: "mapping"
                    }
                }]
            },
            optionsInSrc3: {
                options: {
                    data: {
                        one: "mapping",
                        two: "mapping",
                        three: "mapping"
                    }
                },
                files: [{
                    src: "test/src/optionsInSrc.hbs",
                    dest: "tmp/optionsInSrc3.txt"
                }]
            },
            helper: {
                options: {
                    helpers: "test/src/helper.js"
                },
                src: "test/src/helper.hbs",
                dest: "tmp/helper.txt"
            },
            partial: {
                options: {
                    partials: "test/src/apartial.hbs"
                },
                src: "test/src/partial.hbs",
                dest: "tmp/partial.txt"
            },
            optionsOrder: {
                src: "test/src/optionsOrder.hbs",
                dest: "tmp/optionsOrder.txt"
            },
            
            multipleSrc: {},
            
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
        "nodeunit"
    ]);
    grunt.registerTask("default", ["jshint", "test"]);
};
