const path = require('path');

module.exports = {
    entry: {
        app: './src/js/app.js'
    },
    output: {
        filename: '[name].js',
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
                use: [{
                    loader: "style-loader" // creates style nodes from JS strings
                }, {
                    loader: "css-loader" // translates CSS into CommonJS
                }, {
                    loader: "sass-loader", // compiles Sass to CSS
                }]
            }

            // Loaders for other file types can go here

        ],
    },

};