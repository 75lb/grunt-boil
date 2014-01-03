"use strict";
module.exports = function(grunt) {

    var handlebars = require("handlebars"),
        path = require("path"),
        yaml = require("js-yaml"),
        l = console.log;

    function loadModules(helpers, partials){
        grunt.file.expand(helpers).forEach(function(helper){
            require(path.resolve(process.cwd(), helper))(handlebars, grunt, FrontMatterExtractor);
        });
        grunt.file.expand(partials).forEach(function(partial){
            handlebars.registerPartial(path.basename(partial, ".hbs"), grunt.file.read(partial));
        });
    }

    function arrayify(input){
        return Array.isArray(input) ? input : [ input ];
    }
    
    function extend(src, dest){
        for (var prop in dest){
            src[prop] = dest[prop];
        }
        return src;
    }
    
    function File(createItem, content){
        var name = new Content();
        name.template = typeof createItem === "string" 
            ? createItem 
            : createItem.filename || "";
        name.data = content.data;
        this.name = name.rendered();
        this.copy = createItem.copy;
        this.content = content;        
    }
    File.prototype.create = function create(){
        if (this.copy){
            grunt.file.copy(this.copy, this.name);
        } else {
            grunt.file.write(this.name, this.content.rendered());
        }
        grunt.log.ok("created: " + this.name);
    };
    
    function Content(dataProto){
        this.template = "";
        this.data = Object.create(dataProto || null);
        this.rendered = function(){
            if (this.template){
                var compiled = handlebars.compile(this.template);
                return compiled(this.data);
            } else {
                return "";
            }
        };
        this.merge = function(createItem){
            var data = createItem.templateData;
            for (var prop in data){
                if (typeof data[prop] === "string"){
                    var extraction = new FrontMatterExtractor(data[prop]);
                    if (extraction.frontMatter){
                        createItem.templateData[prop] = extraction;
                    }
                }
            }
            this.data = extend(this.data, createItem.templateData);
            this.template = typeof createItem.template === "object" 
                ? JSON.stringify(createItem.template, null, "    ")
                : createItem.template;
        };
    }
    
    function FrontMatterExtractor(input){
        var matter = /^---$([\s\S]*)^---$/m;
        this.frontMatter = null;
        this.remainder = input;
        if (input && typeof input === "string"){
            var matches = input.match(matter);
            if (matches){
                this.frontMatter = yaml.safeLoad(matches[1]);
                this.remainder = input.replace(matches[0], "").trim();
                // l(this.frontMatter);
            }
        } 
    }

    grunt.registerMultiTask("boil", "Boilerplate a new package, page, module, whatever..", function() {
        var options = this.options({ 
                helpers: [],
                partials: [],
                templateData: {}
            });
        
        /*
        Base content object. Loads normalised task & target level options, adds grunt reference
        and command-line args. 
        */
        var dataProto = options.templateData;
        dataProto.grunt = grunt;
        if (this.args.length > 0){
            dataProto.args = this.args;
        }
        
        loadModules(options.helpers, options.partials);
        
        if (!this.data.create && !this.data.pages){
            var exampleConfig = {
                boil: {
                    something: {
                        create: [ "file1.hmtl", "file2.js", "etc" ]
                    }
                }
            };
            grunt.fail.fatal(
                "You must specify at least one 'create' or 'pages, e.g.: \n\n" + 
                JSON.stringify(exampleConfig, null, "    ")
            );
        }
        
        if (this.data.create){
            arrayify(this.data.create).forEach(function(createItem){
                if (!createItem.template && createItem.templateFile){
                    createItem.template = grunt.file.read(createItem.templateFile);
                }
                
                var extractor = new FrontMatterExtractor(createItem.template);
                var content = new Content(dataProto);

                createItem.template = extractor.remainder;
                content.merge(createItem);
                content.data = extend(content.data, extractor.frontMatter);
                var file = new File(createItem, content);
                file.create();
            });
        }
    });
};
