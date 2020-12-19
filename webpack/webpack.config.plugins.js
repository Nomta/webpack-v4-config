const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const webpack = require('webpack');

const { getPathName, getPatternsToCopy, getPathNames } = require('./utils');
const { aliases, filesToBeCopy, template } = require('./config');

const pathnames = getPathNames(__dirname);

const isDev = process.env.NODE_ENV === 'development';

/* plugins */

const plugins = [
    new HTMLWebpackPlugin({
        minify: { collapseWhitespace: !isDev },
        // title: 'Webpack v4',
        template
    }),
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin(getPatternsToCopy(filesToBeCopy, pathnames.src, pathnames.dist)),
    new MiniCssExtractPlugin({
        filename: getPathName('css')
    }),
    // new webpack.ProvidePlugin(aliases)
];

if (process.env.NODE_ENV === 'stats') {
    plugins.push(new BundleAnalyzerPlugin())
}

/* export */

module.exports = plugins;