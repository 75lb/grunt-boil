/**
<Description Here>

@class widget
@extends _WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin
@uses hdx/extensions/array
@uses "./templates/widget.html",
@uses "./nls/widget"
*/
define([
    "dojo/_base/declare",
    "dijit/_WidgetBase",
    "dijit/_TemplatedMixin",
    "dijit/_WidgetsInTemplateMixin",
    "dojo/text!./templates/widget.html",
    "dojo/i18n!./nls/widget"
], function(declare, _WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, template, i18n){
    return declare([ _WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin ], {
        
        i18n: i18n,
        templateString: template
        
    });
});
