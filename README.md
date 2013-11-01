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

#### options.name
Type: `String`
Default value: `default`

The string to replace `{{=name}}` 

### Usage Examples

#### Default Options
The follow example, the `{{=name}}` token is replaced by `default` (the default value for the `name` option).

```js
grunt.initConfig({
  new: {
    one: {
      newFiles: [
          "tmp/{{=name}}/main.js",
          "tmp/{{=name}}/examples/{{=name}}.html"
      ]
    },
  },
})
```

Output: 

```sh
$ find tmp
tmp
tmp/default
tmp/default/examples
tmp/default/examples/default.html
tmp/default/main.js
```

#### Custom Options
Supply a custom `name` value in `options` to specify the value for `{{=name}}`:

```js
grunt.initConfig({
    new: {
      one: {
        options: {
          name: "Widget"
        },
        newFiles: [
            "tmp/{{=name}}/main.js",
            "tmp/{{=name}}/examples/{{=name}}.html"
        ]
      }
    }
})
```

Output: 
```sh
$ find tmp
tmp/Widget
tmp/Widget/examples
tmp/Widget/examples/Widget.html
tmp/Widget/main.js
```

#### Command-line Arg
Or pass a custom `name` value as a task argument on the command line. With this config:

```js
grunt.initConfig({
    new: {
      one: {
        newFiles: [
            "tmp/{{=name}}/main.js",
            "tmp/{{=name}}/examples/{{=name}}.html"
        ]
      }
    }
})
```

this command: 
```sh
$ grunt new:one:module
```

produces this output: 
```sh
$ find tmp
tmp/module
tmp/module/examples
tmp/module/examples/module.html
tmp/module/main.js
```


## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

