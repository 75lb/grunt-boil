/**
<Description Here>

@class {{args.[0]}}
@extends _WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin
@uses hdx/extensions/array
@uses "./templates/{{args.[0]}}.html",
@uses "./nls/{{args.[0]}}"
*/
define([
    "dojo/_base/declare",
    "dijit/_WidgetBase",
    "dijit/_TemplatedMixin",
    "dijit/_WidgetsInTemplateMixin",
    "dojo/text!./templates/{{args.[0]}}.html",
    "dojo/i18n!./nls/{{args.[0]}}"
], function(declare, _WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, template, i18n){
    return declare([ _WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin ], {
        
        i18n: i18n,
        templateString: template
        
    });
});
