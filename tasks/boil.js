"use strict";
module.exports = function(grunt) {

    var handlebars = require("handlebars"),
        path = require("path"),
        yaml = require("js-yaml"),
        l = console.log;

    function loadModules(helpers, partials){
        grunt.file.expand(helpers).forEach(function(helper){
            require(path.resolve(process.cwd(), helper))(handlebars);
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
            : createItem.name || "";
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
            this.data = extend(this.data, createItem.templateData);
            this.template = typeof createItem.content === "object" 
                ? JSON.stringify(createItem.content, null, "    ")
                : createItem.content;
        };
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
                var matches, frontMatter;
                if (createItem.content && typeof createItem.content === "string"){
                    matches = createItem.content.match(/^---$([\s\S]*)^---$/m);
                    if (matches){
                        frontMatter = yaml.safeLoad(matches[1]);
                        createItem.content = createItem.content.replace(matches[0], "").trim();
                        // l(frontMatter);
                    }
                }
                var content = new Content(dataProto);
                content.merge(createItem);
                content.data = extend(content.data, frontMatter);
                var file = new File(createItem, content);
                file.create();
            });
        }
    });
};
