var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/js/main.js',
    output: {
        path: 'build',
        filename: 'bundle.js'
    },
    plugins: [
        new HtmlWebpackPlugin({
            // defaults to produce index.html
            title: 'TODO',
            template: 'src/index.html.template'
        })
    ]
};
