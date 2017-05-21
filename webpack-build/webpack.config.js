const path = require('path');

module.exports = {
    entry: {
        app: './src/js/app.js'
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist/js')

    },

};