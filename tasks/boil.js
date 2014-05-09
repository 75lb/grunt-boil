"use strict";
var handlebars = require("handlebars"),
    path = require("path"),
    fme = require("front-matter-extractor"),
    l = console.log;

function render(template, data){
    return handlebars.compile(template)(data);
}

function extend(obj, srcObj){
    for (var prop in srcObj){
        obj[prop] = srcObj[prop];
    }
    return obj;
}

module.exports = function(grunt) {
    function loadModules(helpers, partials){
        if (helpers){
            grunt.file.expand(helpers).forEach(function(helper){
                require(path.resolve(process.cwd(), helper))(handlebars, grunt);
            });
        }
        if (partials){
            grunt.file.expand(partials).forEach(function(partial){
                handlebars.registerPartial(path.basename(partial, ".hbs"), grunt.file.read(partial));
            });
        }
    }

    grunt.registerMultiTask("boil", "Boilerplate files, packages, apps, websites etc.", function(){
        var options = this.options({
                data: {}
            }),
            mappingData = this.data.data || {},
            data = extend(options.data, mappingData);

        data.args = this.args;
        data.grunt = grunt;
        loadModules(options.helpers, options.partials);
        
        this.files.forEach(function(file){
            var content = "",
                mappingData = file.data || {};
            data = extend(data, mappingData);

            if (file.copy){
                grunt.file.copy(
                    render(file.copy, data), 
                    render(file.dest, data), 
                    { encoding: null }
                );
            } else {
                if (file.src && file.src.length){
                    var extracted = fme.extract(grunt.file.read(file.src[0]));
                    content = extracted._remainder;
                    data = extend(data, extracted);
                }
                var outputFile = render(file.dest, data),
                    outputContent = render(content, data);
                grunt.file.write(outputFile, outputContent);
                grunt.log.ok("Created: " + outputFile);
            }
        });
    });
};
