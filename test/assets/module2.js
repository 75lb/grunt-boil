/**
<Description Here>

@class $1
@extends _WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin
@uses hdx/extensions/array
@uses "./templates/$1.html",
@uses "./nls/$1"
*/
define([
    "dojo/_base/declare",
    "dijit/_WidgetBase",
    "dijit/_TemplatedMixin",
    "dijit/_WidgetsInTemplateMixin",
    "dojo/text!./templates/$1.html",
    "dojo/i18n!./nls/$1"
], function(declare, _WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, template, i18n){
    return declare([ _WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin ], {
        
        i18n: i18n,
        templateString: template
        
    });
});
