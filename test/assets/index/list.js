module.exports = function(handlebars){
    handlebars.registerHelper("list", function(context, options){
        var ret = "";
        context.forEach(function(item){
            ret += options.fn(item);
        });
        return ret;
    });
};
