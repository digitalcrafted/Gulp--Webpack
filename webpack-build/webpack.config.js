const path = require('path');
const glob = require('glob-all');
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const PurifyCSSPlugin = require('purifycss-webpack');
const extractSass = new ExtractTextPlugin({
    filename: "css/[name].[contenthash:8].css",
});
const purify = new PurifyCSSPlugin({
    // Give paths to parse for rules. These should be absolute!
    paths: glob.sync([
        path.join(__dirname, 'src/*.html'),
        path.join(__dirname, 'src/partials/*.html'),
        path.join(__dirname, 'dist/js/*.js')
    ]),
    minimize: true
});
const createHtml = new HtmlWebpackPlugin({
    filename: "index.html",
    template: './src/index.html'
});
const copyfiles = new CopyWebpackPlugin([
    // Copy directory contents to {output}/to/directory/
    {from: './src/img', to: './img'},
], {
    ignore: [],
    copyUnmodified: true
});
module.exports = {
    entry: {
        app: './src/js/app.js'
    },
    output: {
        filename: 'js/[name].[chunkhash:8].js',
        path: path.resolve(__dirname, 'dist/')
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: [{
                    loader: 'babel-loader',
                    options: {presets: ['es2015']},
                }],
            },
            {
                test: /\.scss$/,
                use: extractSass.extract({
                    use: [
                        {
                            loader: "css-loader" // translates CSS into CommonJS
                        },
                        {
                            loader: "sass-loader", // compiles Sass to CSS
                        }
                    ]
                })
            },
        ],
    },
    plugins: [
        extractSass,
        purify,
        createHtml,
        copyfiles
    ]
};