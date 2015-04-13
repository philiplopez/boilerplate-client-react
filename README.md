**Project Status:** In early development, but useful as gentle introduction to some modern (2015) JavaScript tools.  

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


WebStorm Setup Tips
===================

## Plugins
* There is a [GFM Markdown](https://guides.github.com/features/mastering-markdown/) [plugin](https://github.com/ShyykoSerhiy/gfm-plugin) 
  although it might not yet work with WebStorm 10.
* TODO: Babel 
* TODO: ESLint


Boilerplate Implementation Notes
================================

The following is a *very gentle* introduction to how this boilerplate is put together in a step-by-step manner.


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


## Task 6: Babel loader for transpiling ES6 and React JSX

Our goal now is to render a simple React (v0.13) component written in 
[ES6 class syntax](https://facebook.github.io/react/blog/2015/01/27/react-v0.13.0-beta-1.html).
This is achieved by the following code in `App.jsx`:
 
```javascript
import React from "react";

export default class App extends React.Component {
    render() {
        let items = [];
        for (let i = 0; i < 100; i++) {
            items[i] = <div>Hello {this.props.name}! The square of {i+1} is {(i+1) * (i+1)}</div>;
        }
        return <div>{items}</div>
    }
}
```

Note that we are using [ES6 module syntax](https://babeljs.io/docs/learn-es6/) which defaults in
Babel to transpiling to CommonJS. Of course, we also need to add React as a dependency via
`npm install react --save`.

`main.js` is our entry point for webpack, so we add the following (again with ES6 module imports).

```javascript
import React from "react";
import App from "./ui/App.jsx";

React.render(<App name="YOU"/>, document.getElementById("app"));
```

We are rendering to an element within `document.body` since our template includes a warning message to
IE8 browser users; `React.render(...)` will generally *replace* the body of the element provided. 

However, these files will not compile using webpack without an ES6 and JSX transpiler. So we introduce
[babel-loader](https://github.com/babel/babel-loader) via `npm install babel-loader --save-dev`
for this purpose in `webpack.config.js` as follows:

```javascript
module.exports = {
    ...,
    module: {
        loaders: [
            {
                test: /\.(js|jsx)$/,        // either .js or .jsx files
                exclude: /node_modules/,
                loader: "babel-loader"
            }
        ]
    },
    ...
};
```

Note that `.js` files in the project (excluding `node_modules`) are now treated as ES6; it might be prudent to rename
these files to something else (e.g. `.es6`) but for now we will leave it.

Using `webpack-dev-server` (installed globally at this stage via `npm install webpack-dev-server -g`) will provide
a working web page (defaults to <http://localhost:8080/>).


## Task 7: Setup npm scripts for webpack

Due to the way [npm includes `node_modules/.bin` in PATH](https://docs.npmjs.com/misc/scripts), setting up custom
scripts for npm avoids the need to globally install (`npm install -g ...`) utilities (e.g. `webpack`). This is
easily done using the "scripts" array in `package.json`, e.g.

```javascript
"scripts": {
    "server": "webpack-dev-server"
```

So now we can simply run `npm run server`. Invoking `npm run` without any arguments lists the available scripts 
(and their definitions).


## Task 8: Setup eslint

[ESLint](http://eslint.org/) is a modern linting utility that supports ES6 and JSX. Basic configuration is
in `.eslintrc` and an npm script `lint` is created.

Configuring ESLint support in WebStorm 10 is simply a matter of enabling the ESLint code quality tool.

For help on resolving lint warnings, go to <http://jslinterrors.com/>.


# Task 9: Setting up react-router

Let's move from a trivial component to something a little more sophisticated with multiple "places" (routes).
We won't adopt a larger pattern/framework just yet, but will introduce [react-router](https://github.com/rackt/react-router)
which is a popular routing tool for React. `npm install react-router --save` is the first step of course.

We'll use the ubiquitous "e-commerce" use case, where there are Products to purchase, and a Shopping Cart.

We'll introduce the following two "places" (routes) in the app to support deep linking.

* `/` - home, should provide a "catalog" view of the products
* `/product/{productId}` - the product details page

We also want to have a some basic layout template so that headers and footers are shared.

Our `main.js` bootstrap needs to reference the react-router Router object and provide it
with both a `routes` data structure as well as a route *handler* callback.

```javascript
Router.run(routes, Router.HashLocation, (Handler) => {
    React.render(<Handler />, document.getElementById("app"));
});
```

We explicitly instruct the Router to use the `HashLocation` implementation (which is the default). Later this
will change to `HistoryLocation`. There are a number of 
[Location implementations](https://github.com/rackt/react-router/blob/master/docs/api/Location.md).

We can see that `<Handler />` is some React component that is going to be rendered, and presumably `routes` is
some sort of map from a location to a component. We define `routes` in `routes.js`:

```javascript
const routes = (
    <Route name="app" path="/" handler={AppTemplate}>
        <DefaultRoute name="catalog" handler={CatalogPage} />
        <Route name="product" path="product/:productId" handler={ProductPage} />
    </Route>
);
```

This is the JSX-based way of configuring routes that react-router uses.

What we haven't covered here is:

* shared services (client-side) and related dependency injection
* server-side rendering (so-called "isomorphic" applications)
* code splitting (i.e. splitting the bundle into smaller chunks downloaded on-demand - but our bundle.js is
only ~60kB when minified and gzipped at the moment, albeit without much code).



## Future tasks:
* Task ?: Introduce styling with https://github.com/js-next/react-style
* Task ?: Introduce unit tests with mocha/chai
* Task ?: Basic "app" (templates, routes) 
* Task ?: Webstorm configuration for babel (if this is necessary)...
* Task ?: webpack-dev-server options... e.g. devtool eval/source-maps
* Task ?: Test with site performance testing tools, e.g.
    * [Google PageSpeed](https://developers.google.com/speed/pagespeed/)
    * [YSlow](http://yslow.org/)
