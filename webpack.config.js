const path = require('path');
const webpack = require('webpack');
const { merge } = require('lodash');

/* plugins */

const HTMLWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer');

/* setting constants */

const isDev = process.env.NODE_ENV === 'development';
const port = 3000;

const dirnames = {
    src: 'src',
    dist: 'dist',
    images: 'images',
    assets: 'assets'
};

// const filesToCopy = ['favicon.ico'];
const template = './index.html';

const aliases = {
    _: 'lodash'
 };

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
    module: {
        rules: [{
            test: /\.css$/,
            use: getCSSLoaders()
        }, {
            test: /\.s[ac]ss$/,
            use: getCSSLoaders('sass-loader')
        }, {
            test: /\.(png|jpg|svg|gif)$/,
            use: getFileLoaders(dirnames.images)
        }, {
            test: /\.(ttf|woff|woff2|eot)$/,
            use: getFileLoaders(dirnames.assets)
        }, {
            test: /\.ts$/,
            exclude: /node_modules/,
            loader: getBabelLoader('@babel/preset-typescript')
        }, {
            test: /\.js$/,
            exclude: /node_modules/,
            loader: isDev ? 'eslint-loader' : getBabelLoader()
        }]
    },
    optimization: {
        splitChunks: {
            chunks: 'all'
        }
    },
    plugins: getPlugins(),
    resolve: {
    //  extensions: ['.js', '.json', '.jsx'],
        alias: {
            '@': path.resolve(__dirname, dirnames.src)
        }
    }
}

const devConfig = {
    mode: 'development',
    devServer: { /* contentBase: './', */ port, hot: true },
    devtool: 'source-map'
}

const prodConfig = {
    mode: 'production',
    entry: {
        polyfills: '@babel/polyfill'
    },
    optimization: {
        minimizer: [
            new OptimizeCssAssetWebpackPlugin(),
            new TerserWebpackPlugin()
        ]
    }
}

/* utils */

function getBabelLoader(...presets) {
    return {
        loader: 'babel-loader',
        options: {
            presets: [ '@babel/preset-env', ...presets ],
            plugins: [ '@babel/plugin-proposal-class-properties' ],
            // babelrc: false
        }
    };
}

function getCSSLoaders(...loaders) {
    return [{
        loader: MiniCssExtractPlugin.loader,
        options: { hmr: isDev, reloadAll: true },
    }, 'css-loader', ...loaders];
}

function getFileLoaders(dirName) {
    return [{
        loader: 'file-loader',
        options: {
            name:  path.resolve(__dirname, dirName, getFileName('[ext]'))
        }
    }];
}

function getFileName(ext) {
    return isDev ? `[name].${ext}` : `[name].[hash].${ext}`;
}

function getPatternsToCopy() {
    return filesToCopy.map(filename => ({
        from: path.resolve(__dirname, dirnames.src, filename),
        to: path.resolve(__dirname, dirnames.dist)
    }));
}

function getPlugins() {
    const plugins = [
        new HTMLWebpackPlugin({
            minify: { collapseWhitespace: !isDev },
            template
        }),
        new CleanWebpackPlugin(),
        // ValidationError: CopyPlugin Invalid Options
        // new CopyWebpackPlugin({
        //     patterns: getPatternsToCopy()
        // }),
        new MiniCssExtractPlugin({
            filename: getFileName('css')
        }),
        new webpack.ProvidePlugin(aliases)
    ];

    if (process.env.NODE_ENV === 'stats') {
        plugins.push(new BundleAnalyzerPlugin())
    }
    return plugins;
}

/* export */

module.exports = merge(isDev ? devConfig : prodConfig, config);