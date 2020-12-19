const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

// const webpack = require('webpack');

const { getPathName, getPatternsToCopy, getPathNames } = require('./utils');
const { aliases, filesToBeCopy, template } = require('./config');

const pathnames = getPathNames(__dirname);

const isDev = process.env.NODE_ENV === 'development';

/* plugins */

const plugins = [
    new HTMLWebpackPlugin({ template }),
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin(getPatternsToCopy(filesToBeCopy, pathnames.src, pathnames.dist)),
    // Error in development: [alias] is not defined
    // new webpack.ProvidePlugin(aliases)
];

if (!isDev) {
    plugins.push(new MiniCssExtractPlugin({ filename: getPathName('css') }));

    if (process.env.NODE_ENV === 'stats') {
        plugins.push(new BundleAnalyzerPlugin());
    }
}


/* export */

module.exports = plugins;