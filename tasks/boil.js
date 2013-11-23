"use strict";
module.exports = function(grunt) {

    var handlebars = require("handlebars"),
        path = require("path");

    function arrayify(input){
        return Array.isArray(input) ? input : [ input ];
    }
    
    function resolveTemplate(template, data){
        var compiled = handlebars.compile(template);
        return compiled(data);
    }
    
    function File(file, templateData){
        this.name = typeof file === "string" 
            ? file 
            : file.name || "";
        this.name = resolveTemplate(this.name, templateData);
        this.copy = file.copy;
        this.content = typeof file.content === "object" 
            ? JSON.stringify(file.content, null, "    ")
            : file.content;
        if (this.content){
            this.content = resolveTemplate(this.content, templateData);
        }
        
    }
    File.prototype.create = function create(){
        if (this.copy){
            grunt.file.copy(this.copy, this.name);
        } else {
            grunt.file.write(this.name, this.content);
        }
        grunt.log.ok("created: " + this.name);
    };

    grunt.registerMultiTask("boil", "Boilerplate a new package, page, module, whatever..", function() {
        var options = this.options({ 
                helpers: [],
                partials: [],
                templateData: {}
            }),
            helpers = options.helpers,
            partials = options.partials,
            templateData = options.templateData;
        
        templateData.grunt = grunt;
        templateData.args = this.args.length > 0 ? this.args : templateData.args;

        grunt.file.expand(helpers).forEach(function(helper){
            require(path.resolve(process.cwd(), helper))(handlebars);
        });
        grunt.file.expand(partials).forEach(function(partial){
            handlebars.registerPartial(path.basename(partial, ".hbs"), grunt.file.read(partial));
        });
        
        if (this.data.create){
            arrayify(this.data.create).forEach(function(file){
                file = new File(file, templateData);
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
