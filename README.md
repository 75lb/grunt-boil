[![NPM version](https://badge.fury.io/js/grunt-boil.png)](http://badge.fury.io/js/grunt-boil)
[![Build Status](https://travis-ci.org/75lb/grunt-boil.png)](https://travis-ci.org/75lb/grunt-boil)

# grunt-boil

> Boilerplate a new package, page, stylesheet, module, app, whatever..

## Getting Started
This plugin requires Grunt `~0.4.1`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-boil --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-boil');
```

## The "boil" task

Use Boil to boilerplate new files (including content) and folder structures in your project. The type of commands you end up running look like: 

Create a new plug-in module called "reddit" in the "news" package

    $ grunt boil:plugin:news:reddit

Create a new package called global-styles

    $ grunt boil:package:global-styles
    
Generate an index page 

    $ grunt boil:index

### Overview
In your project's Gruntfile, add a section named `boil` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
    boil: {
        options: {
            // Handblebars helpers to load
            helpers: "helpers/*.js",
            // Data available to each template in the `create` list
            templateData: { user: "Lloyd", task: "grunt-boil" }
        },
        your_target: {
            // Target-specific file lists and/or options go here.
            create: {
                name: "file-to-be-created.html",
                content: "<p>{{user}} is running {{task}}!</p>"
            }
        }
    }
})
```

### Options

#### helpers
Type: `String` | `Array`
Default: null

A [globbing pattern](http://gruntjs.com/api/grunt.file#globbing-patterns), or array of patterns specifying the filenames of [handlebars](http://handlebarsjs.com) [helpers](http://handlebarsjs.com/block_helpers.html) to be registered. Here is the boilerplate helper module: 

    module.exports = function(handlebars){
        handlebars.registerHelper("myHelper", function(context, options){
            // your helper code here
        });
    };
    
#### templateData
Type: Object
Default: {}

The data available to your templates

### Usage Examples

#### Simplest Example
In the simplest example, a new file structure is created with no string replacement:

```js
grunt.initConfig({
  boil: {
    component: {
      create: [
          "tmp/component/main.js",
          "tmp/component/examples/component.html"
      ]
    },
  },
})
```

Output: 

```sh
$ find tmp
tmp
tmp/component
tmp/component/examples
tmp/component/examples/component.html
tmp/component/main.js
```

#### Command-line Args
You can pass values in from the command line to insert into your created file name or content. `{{args.[0]}}` is the first arg value, `{{args.[1]}}` the second etc.

```js
grunt.initConfig({
    boil: {
      component: {
        create: [
            "tmp/{{args.[0]}}/{{args.[1]}}/main.js",
            "tmp/{{args.[0]}}/{{args.[1]}}/examples/{{args.[1]}}.html"
        ]
      }
    }
})
```

this command: 
```sh
$ grunt boil:component:components:Widget
```

will produce the output: 
```sh
$ find tmp
tmp/components
tmp/components/Widget
tmp/components/Widget/examples
tmp/components/Widget/examples/Widget.html
tmp/components/Widget/main.js
```

[![NPM](https://nodei.co/npm-dl/grunt-boil.png?months=1)](https://nodei.co/npm/grunt-boil/)

[![Bitdeli Badge](https://d2weczhvl823v0.cloudfront.net/75lb/grunt-boil/trend.png)](https://bitdeli.com/free "Bitdeli Badge")
