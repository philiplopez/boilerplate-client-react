Overview
========

This repository provides a basic setup for modern web client application
development using the React library and JavaScript (ES6) using the following tools:

* [npm](https://docs.npmjs.com/) - for dependency management and basic scripts

* [babel](http://babeljs.io/) - for ES6/JSX transpiling (to ES5)

* [webpack](http://webpack.github.io/docs/) - for build tasks (e.g. transpiling)
  and including the [webpack-dev-server](http://webpack.github.io/docs/webpack-dev-server.html)
  as well as webpack loaders as needed (TODO: babel, LESS, eslint?) 
 
* [ESLint](http://eslint.org/docs/) - for JavaScript (ES6 + JSX) 

* [React](http://facebook.github.io/react/docs/getting-started.html)

* [Mocha](http://mochajs.org/) test framework

* [WebStorm setup tips](https://www.jetbrains.com/webstorm/) IDE setup tips
  including [EditorConfig](http://editorconfig.org/)
  
* Basic responsive client example using:
    * [html5-boilerplate](https://html5boilerplate.com/)
    * [material-ui](http://www.material-ui.com/) CSS/components for React


Usage Notes
===========

* The following icon files should be replaced as required (they were provided by html5-boilerplate):
    * apple-touch-icon.png
    * tile.png and tile-wide.png (see browserconfig.xml)
    * favicon.ico


Tasks ToDo
==========
- [x] Create basic directory structure
- [x] Setup npm
- [ ] Create basic boilerplate (HTML5Boilerplate) JSX and entry point
- [ ] Setup webpack for transpiling (ES6/JSX) and template
- [ ] Setup webpack dev server
- [ ]


WebStorm Setup Tips
===================

## Plugins
* There is a [GFM Markdown](https://guides.github.com/features/mastering-markdown/) [plugin](https://github.com/ShyykoSerhiy/gfm-plugin) 
  although it might not yet work with WebStorm 10.
* TODO: Babel 
* TODO: ESLint


Boilerplate Implementation Notes
================================

The following is a very gentle introduction to how this boilerplate is put together.


## Task 1: Setup basic directory structure

The basic directory structure is as follows:
 
* project root - contains basic config files (`package.json` and `webpack.config.js`)
  * `node_modules` - created upon `npm install`
  * `build` - files to deploy to web server (TODO: check for tests); these are generated via the webpack process
  * `src` - source files
    * `js` - JavaScript source files
    * `less` - [LESS CSS pre-processor](http://lesscss.org/) files
    * `static` - files to be deployed as-is, primarily for browser site icon use
    

## Task 2: Initial webpack configuration

Apart from `npm install webpack -g` (if necessary, to install webpack as a 
[global command](https://docs.npmjs.com/getting-started/installing-npm-packages-globally)), 
the basic configuration for webpack is as follows:

```javascript
module.exports = {
    entry: './src/js/main.js',
    output: {
        path: 'build',
        filename: 'bundle.js'
    }
}
```

This simply states that webpack should look at `src/js/main.js` to find the various resources
to process, and output the bundle as `bundle.js` in the `build` directory (as well as any other
resources.) The `main.js` file is mostly empty at this stage.


## Task 3: Basic HTML5 boilerplate

A basic HTML5 responsive website boilerplate was obtained from <http://www.initializr.com/> 
(based on <https://html5boilerplate.com/>). This was trimmed in anticipation of using React and
the Material-UI library for CSS. Either way, it resulted in `index.html` and files for deployment
in `static` (e.g. `favicon.ico`, `robots.txt`).


## Task 4: Configure webpack to copy static files

Webpack is not a generic build tool, so it is not designed for bulk file processing. It focuses
on creating optimised bundles for downloading to the client browser. However, some files need to be
deployed to the website as-is without renaming (e.g. icons for browsers such as `favicon.ico`).

By including `static/static-resources.js` via a `require(...)` in `js/main.js`, we
utilise the [file loader](https://github.com/webpack/file-loader) for webpack using a *custom name*
(not the default `file-loader` behaviour) to make the static files available.

`static-resources.js` has, for example:

```javascript
require("file?name=[path][name].[ext]&context=src/static!./apple-touch-icon.png");
```

This means: using the `file` loader (for webpack), process the file `./apple-touch-icon.png`
(relative to `static-resources.js`) and output it without preserving the `context`. This is
described in a [webpack issue](https://github.com/webpack/webpack/issues/395).

Now, when we run the `webpack` command, a `build` directory is created, a `bundle.js` file
is produced there, and the files referenced in `static-resources.js` are copied there.

**Note:** this implementation may change as webpack is producing code in `bundle.js` referencing 
the static files. There are not many such files, so this doesn't seem like a problem to worry about as
it is a handful of bytes when minified and gzipped.


## Task 5: Configure webpack to generate index.html page

We could treat index.html as a static resource, but it seems strange to "require" in `bundle.js` `index.html`  
that in turn will include a `script` that loads `bundle.js`. The [html-webpack-plugin](https://github.com/ampedandwired/html-webpack-plugin)
can generate the `index.html` file from a template, and automatically include webpack-generated scripts.

`npm install html-webpack-plugin --save-dev` is needed, as well as the following inclusion in `webpack.config.js`:

```javascript
plugins: [
    new HtmlWebpackPlugin({
        // defaults to produce index.html
        template: 'src/index.html.template'
    })
]
```

We are using our own `index.html` template based on the [default](https://github.com/ampedandwired/html-webpack-plugin/blob/master/default_index.html)
and including various HTML5 Boilerplate suggestions (including the important viewport <meta> tag).


## Task 6: 




## Task ?: Setup npm scripts for webpack

e.g.:
* webpack
* webpack -p
* webpack-dev-server

