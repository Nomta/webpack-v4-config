const webpack = require('webpack');

const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer');
// const CopyWebpackPlugin = require('copy-webpack-plugin');
// const OptimizeCssAssetWebpackPlugin = require('optimize-css-assets-webpack-plugin');
// const TerserWebpackPlugin = require('terser-webpack-plugin');

const { getFileName } = require('./utils');
const { aliases, template } = require('./config');
// const { getFileName, getPatternsToCopy } = require('./utils');
// const { aliases, dirnames, filesToBeCopy, template } = require('./config');

const isDev = process.env.NODE_ENV === 'development';

/* plugins */

const plugins = [
    new HTMLWebpackPlugin({
        minify: { collapseWhitespace: !isDev },
        template
    }),
    new CleanWebpackPlugin(),
    // ValidationError: CopyPlugin Invalid Options
    // new CopyWebpackPlugin({
    //     patterns: getPatternsToCopy(filesToBeCopy, dirnames.src, dirnames.dist)
    // }),
    new MiniCssExtractPlugin({
        filename: getFileName('css')
    }),
    new webpack.ProvidePlugin(aliases)
];

if (process.env.NODE_ENV === 'stats') {
    plugins.push(new BundleAnalyzerPlugin())
}

/* export */

module.exports = plugins;