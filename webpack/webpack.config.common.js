const path = require('path');
const { getPathName, getPathNames } = require('./utils');
const { alias } = require('./config');

const pathnames = getPathNames(__dirname);

/* config */

const config = {
    context: path.resolve(__dirname, pathnames.src),
    entry: {
        main: './index.js'
    },
    output: {
        filename: getPathName('js'),
        path: path.resolve(__dirname, pathnames.dist)
    },
    optimization: {
        splitChunks: {
            chunks: 'all'
        }
    },
    resolve: {
        alias: Object.assign({}, alias, {
            '@': path.resolve(__dirname, pathnames.src)
        })
    },
    module: require('./webpack.config.module'),
    plugins: require('./webpack.config.plugins')
}

/* export */

module.exports = config;