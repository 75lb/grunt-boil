"use strict";
module.exports = function(grunt) {

    var handlebars = require("handlebars"),
        path = require("path");

    function arrayify(input){
        return Array.isArray(input) ? input : [ input ];
    }
    
    function File(file){
        this.name = typeof file === "string" ? file : file.name || "";
        this.copy = file.copy;
        this.content = typeof file.content === "object" 
            ? JSON.stringify(file.content, null, "    ")
            : file.content;
    }
    File.prototype.create = function create(){
        if (this.copy){
            grunt.file.copy(this.copy, this.name);
        } else {
            grunt.file.write(this.name, this.content);
        }
        grunt.log.ok("created: " + this.name);
    };

    function resolveTemplate(template, data){
        var compiled = handlebars.compile(template);
        return compiled(data);
    }
    
    grunt.registerMultiTask("boil", "Boilerplate a new package, page, module, whatever..", function() {
        var options = this.options({ 
                helpers: [],
                templateData: {}
            }),
            helpers = options.helpers,
            templateData = options.templateData;
        
        templateData.grunt = grunt;
        templateData.args = this.args.length > 0 ? this.args : templateData.args;

        grunt.file.expand(helpers).forEach(function(helper){
            require(path.resolve(process.cwd(), helper))(handlebars);
        });
        
        if (this.data.create){
            arrayify(this.data.create).forEach(function(file){
                file = new File(file);
                grunt.verbose.writeln("file: ", JSON.stringify(file, null, "    "));
                file.name = resolveTemplate(file.name, templateData);
                if (file.content){
                    file.content = resolveTemplate(file.content, templateData);
                }
                file.create();
            });
        } else {
            var exampleConfig = {
                boil: {
                    something: {
                        create: [ "file1.hmtl", "file2.js", "etc" ]
                    }
                }
            };
            grunt.fail.fatal("You must specify at least one file to create, e.g.: \n\n" + JSON.stringify(exampleConfig, null, "    "));
        }
    });
};
