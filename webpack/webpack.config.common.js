const path = require('path');
const { getPathName, getPathNames } = require('./utils');

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
        },
        // nodeEnv: true    // передает переменные в код самого приложения:
        // if (NODE_ENV === 'development') console.log(...)
    },
    resolve: {
    //  extensions: ['.js', '.json', '.jsx'],
        alias: {
            '@': path.resolve(__dirname, pathnames.src)
        }
    },
    module: require('./webpack.config.module'),
    plugins: require('./webpack.config.plugins')
}

/* export */

module.exports = config;