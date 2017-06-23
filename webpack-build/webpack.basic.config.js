/*!
Basic webpack configuration
 */

const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: {
        app: './src/js/app.js'
    },
    output: {
        filename: '[name].[chunkhash:8].js',
        path: path.resolve(__dirname, 'dist/js')

    }
};