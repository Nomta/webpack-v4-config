const { 
    getBabelLoader, 
    getCSSLoaders, 
    getFileLoaders, 
    getPathNames 
} = require('./utils');

const pathnames = getPathNames(__dirname);

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
        use: getFileLoaders(pathnames.images)
    }, {
        test: /\.(ttf|woff|woff2|eot)$/,
        use: getFileLoaders(pathnames.fonts)
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