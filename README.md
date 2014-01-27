[![NPM version](https://badge.fury.io/js/grunt-boil.png)](http://badge.fury.io/js/grunt-boil)
[![Build Status](https://travis-ci.org/75lb/grunt-boil.png)](https://travis-ci.org/75lb/grunt-boil)
[![Dependency Status](https://david-dm.org/75lb/grunt-boil.png)](https://david-dm.org/75lb/grunt-boil)
![Analytics](https://ga-beacon.appspot.com/UA-27725889-19/grunt-boil/README.md?pixel)

# grunt-boil

> Boilerplate a new package, page, stylesheet, module, app, whatever.. A simple, lightweight alternative to Jekyll and Assemble. 

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

Use Boil to boilerplate new files and folder structures in your project. The kind of commands you might run include: 

Create a new package structure called "Components"

    $ grunt boil:package:Components
    
Boilerplate a new "Person" module in the "Components" package

    $ grunt boil:module:Person:Components

Generate the index page

    $ grunt boil:index
    
..or the whole site

    $ grunt boil:blog

### Overview
In your project's Gruntfile, add a section named `boil` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
    boil: {
        options: {
            // Handblebars helpers to load
            helpers: "helpers/*.js",
            // Default data. Is overridden by target level options and extended by mapping and src-level options.
            data: { user: "Lloyd", task: "grunt-boil" }
        },
        your_target: {
            // standard grunt file array defining what to create
            files: [
                {
                    src: "index.hbs"
                    dest: "index.html",
                    data: {
                        title: "Index page",
                        news: [
                            { title: "An event happened", "content": "etc.." }
                        ]
                    }
                }
            ]
        }
    }
})
```

### Options

#### helpers
Type: `String` | `Array`  
Default: []

A [globbing pattern](http://gruntjs.com/api/grunt.file#globbing-patterns), or array of patterns specifying the filenames of [handlebars](http://handlebarsjs.com) [helpers](http://handlebarsjs.com/block_helpers.html) to be registered. Each helper module should look something like this: 

```js
module.exports = function(handlebars){
    handlebars.registerHelper("myHelper", function(context, options){
        // your helper code here
    });
};
```

#### partials
Type: `String` | `Array`  
Default: []

A [globbing pattern](http://gruntjs.com/api/grunt.file#globbing-patterns), or array of patterns specifying the filenames of [handlebars](http://handlebarsjs.com) [partials](http://handlebarsjs.com/block_helpers.html) to be registered. Each partial should be a file containing markup looking something like this: 

```html
<a href="{{url}}">{{text}}</a>
```

The filename of the partial (minus the `.hbs` extension) becomes the registered name. So, the partial with a filename of `fileStats.hbs` is inserted like so: 

```html
<section>
    <p>See below for the file statistics</p>
    {{> fileStats}}
</section>
```
    
#### data
Type: Object  
Default: {}

The data available to all `src` templates.

Two properties are added to `data` automatically - `grunt` (giving access to grunt config, functionality etc) and `args`, containing the [arguments](http://gruntjs.com/api/inside-tasks#this.args) passed to the task.

You can set an `args` array in `data` to be used as default values in the case no args are specified: 

    data: {
        args: [ "packsges "]
    }

### Examples
A set of progressively more complex examples.

#### Boil a single, empty file
This target:

```js
empty: {  
    dest: "empty.txt"
}
```

with this command: 

```sh
$ grunt boil:empty
```

Produces this file: 

```sh
empty.txt
```

#### Boil a single file with content
This target:

```js
meanings: {  
    src: "default-meanings-file.txt",
    dest: "meanings.txt"
}
```

with this command: 

```sh
$ grunt boil:meanings
```

Produces the file `meanings.txt` with the content specified in `default-meanings-file.txt`.

#### Copy a file without any template resolution
This target:

```js
logo: {  
    copy: "assets/standard-logo.png"
    dest: "logo.png",
}
```

with this command: 

```sh
$ grunt boil:logo
```

Simply duplicates the file specified by `copy`. Useful for binary files. 

#### Create several empty files in sub-folders
This target:

```js
grunt.initConfig({
  boil: {
    empty: {  
        create: [
            "tmp/style/main.css",
            "tmp/style/main.css"
        ]
    }
  }
})
```

with this command: 

```sh
$ grunt boil:empty
```

Produces this output: 

```sh
$ find tmp/*
tmp/empty.txt
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
[![NPM](https://nodei.co/npm-dl/grunt-boil.png?months=3)](https://nodei.co/npm/grunt-boil/)
