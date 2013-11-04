# grunt-new

> Boilerplate new component file and directory structures

## Getting Started
This plugin requires Grunt `~0.4.1`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-new --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-new');
```

## The "new" task

### Overview
In your project's Gruntfile, add a section named `new` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
    new: {
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

#### options.args
Type: `Array`
Default value: []

An array of string values to insert into each filename in newFiles.

### Usage Examples

#### Simplest Example
In the simplest example, a new file structure is created with no string replacement:

```js
grunt.initConfig({
  new: {
    component: {
      newFiles: [
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

#### Pass in arguments
Supply some arguments and they'll be inserted into each file created. Use the `$1`, `$2`, `$3` etc. in your new filename string where you'd like each value to be inserted.

```js
grunt.initConfig({
    new: {
      component: {
        options: {
          args: [ "components", "Widget" ]
        },
        newFiles: [
            "tmp/$1/$2/main.js",
            "tmp/$1/$2/examples/$2.html"
        ]
      }
    }
})
```

Output: 
```sh
$ find tmp
tmp/components
tmp/components/Widget
tmp/components/Widget/examples
tmp/components/Widget/examples/Widget.html
tmp/components/Widget/main.js
```

#### Command-line Arg
Alternatively, and often more conveniently, you can pass your args in from the command line.. With a config like this, with no args specified:

```js
grunt.initConfig({
    new: {
      component: {
        newFiles: [
            "tmp/$1/$2/main.js",
            "tmp/$1/$2/examples/$2.html"
        ]
      }
    }
})
```

this command: 
```sh
$ grunt new:component:components:Widget
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


## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).


[![Bitdeli Badge](https://d2weczhvl823v0.cloudfront.net/75lb/grunt-new/trend.png)](https://bitdeli.com/free "Bitdeli Badge")
