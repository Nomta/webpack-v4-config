const path = require('path');
const { merge } = require('lodash');
const { dirnames } = require('./webpack/config');
const { getFileName } = require('./webpack/utils');

const isDev = process.env.NODE_ENV === 'development';

/* config */

const config = {
    context: path.resolve(__dirname, dirnames.src),
    entry: {
        main: './index.js'
    },
    output: {
        filename: getFileName('js'),
        path: path.resolve(__dirname, dirnames.dist)
    },
    optimization: {
        splitChunks: {
            chunks: 'all'
        }
    },
    resolve: {
    //  extensions: ['.js', '.json', '.jsx'],
        alias: {
            '@': path.resolve(__dirname, dirnames.src)
        }
    },
    module: require('./webpack/webpack.config.module'),
    plugins: require('./webpack/webpack.config.plugins')
}

/* export */

module.exports = merge(isDev ? 
    require('./webpack/webpack.config.dev') : 
    require('./webpack/webpack.config.prod'), 
config);