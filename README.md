# grunt-boil

> Boilerplate arbitrary components, files and directory structures with templated content

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

### Overview
In your project's Gruntfile, add a section named `new` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
    boil: {
        options: {
            // Task-specific options go here.
        },
        your_target: {
            // Target-specific file lists and/or options go here.
        }
    }
})
```

### Options

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
You can pass values in from the command line to insert into your created file name or content. `$1` is the first arg value, `$2` the second etc.

```js
grunt.initConfig({
    boil: {
      component: {
        create: [
            "tmp/$1/$2/main.js",
            "tmp/$1/$2/examples/$2.html"
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

[![Bitdeli Badge](https://d2weczhvl823v0.cloudfront.net/75lb/grunt-boil/trend.png)](https://bitdeli.com/free "Bitdeli Badge")
