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

Use Boil to boilerplate new files (including content) and folder structures in your project. Common tasks you might run include: 

Boilerplate a new "reddit" plug-in in the "news" package

    $ grunt boil:plugin:news:reddit

Create a new package structure called "global-styles"

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
            // The file or files to create
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
    
#### templateData
Type: Object  
Default: {}

The data available to all templates.

Two properties are added to `templateData` automatically - `grunt` (giving access to grunt config, functionality etc) and `args`, containing the arguments passed to the task.

You can set an `args` array in `templateData` to be used as default values in the case no command-line args are passed: 

    templateData: {
        args: [ "packsges "]
    }

### Examples
A set of progressively more complex examples.

#### Boil a single, empty file
This config:

```js
grunt.initConfig({
  boil: {
    empty: {  
        create: "empty.txt"
    }
  }
})
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
This config:

```js
grunt.initConfig({
  boil: {
    meanings: {  
        create: {
            name: "meanings.txt",
            content: "words, adjectives and pronouns"
        }
    }
  }
})
```

with this command: 

```sh
$ grunt boil:meanings
```

Produces this file:

    meanings.txt

With this content: 

    words, adjectives and pronouns

#### Boil a file with content copied from another file
This config:

```js
grunt.initConfig({
  boil: {
    logo: {  
        create: {
            name: "logo.png",
            copy: "assets/logo-main.png"
        }
    }
  }
})
```

with this command: 

```sh
$ grunt boil:logo
```

Produces this file:

    meanings.txt

With this content: 

    words, adjectives and pronouns

#### Boil an HTML doc
This config:

    ```js
    grunt.initConfig({
      boil: {
        meanings: {  
            create: {
                name: "meanings.txt",
                content: "words, adjectives and pronouns"
            }
        }
      }
    })
    ```

    with this command: 

    ```sh
    $ grunt boil:meanings
    ```

    Produces this file:

        meanings.txt

    With this content: 

        words, adjectives and pronouns

#### Create several empty files in sub-folders
This config:

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

[![NPM](https://nodei.co/npm-dl/grunt-boil.png?months=1)](https://nodei.co/npm/grunt-boil/)

[![Bitdeli Badge](https://d2weczhvl823v0.cloudfront.net/75lb/grunt-boil/trend.png)](https://bitdeli.com/free "Bitdeli Badge")
