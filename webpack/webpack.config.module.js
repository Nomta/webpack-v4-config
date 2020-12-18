const { dirnames } = require('./config');
const { getBabelLoader, getCSSLoaders, getFileLoaders } = require('./utils');

const isDev = process.env.NODE_ENV === 'development';

/* module */

const webpackModule = {
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
}

/* export */

module.exports = webpackModule;