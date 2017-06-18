const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const extractSass = new ExtractTextPlugin({
    filename: "../css/[name].[contenthash:8].css",
});

module.exports = {
    entry: {
        app: './src/js/app.js'
    },
    output: {
        filename: '[name].[chunkhash:8].js',
        path: path.resolve(__dirname, 'dist/js')

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
                        /* {
                         loader: "style-loader" // creates style nodes from JS strings <= We wont need this after we use the extractsass plugin
                         },*/
                        {
                            loader: "css-loader" // translates CSS into CommonJS
                        },
                        {
                            loader: "sass-loader", // compiles Sass to CSS
                        }
                    ]
                })
            }

            // Loaders for other file types can go here

        ],
    },
    plugins: [
        extractSass
    ]

};