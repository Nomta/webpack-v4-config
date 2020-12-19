const isDev = process.env.NODE_ENV === 'development';

exports.getBabelLoader = function(...presets) {
    return {
        loader: 'babel-loader',
        options: {
            presets: [ '@babel/preset-env', ...presets ],
            plugins: [ '@babel/plugin-proposal-class-properties' ],
            // babelrc: false
        }
    };
}

exports.getCSSLoaders = function(...loaders) {
    const MiniCssExtractPlugin = require('mini-css-extract-plugin');
    
    return [{
        loader: MiniCssExtractPlugin.loader,
        options: { hmr: isDev, reloadAll: true },
    }, 'css-loader', ...loaders];
}

exports.getFileName = function(ext) {
    const { fileNamePatterns } = require('./config');
    const pattern = fileNamePatterns[process.env.NODE_ENV];

    return `${pattern}.${ext}`;
}


exports.getFileLoaders = function(dirName) {
    const path = require('path');
    
    return [{
        loader: 'file-loader',
        options: {
            name:  path.resolve(__dirname, dirName, exports.getFileName('[ext]'))
        }
    }];
}
exports.getPatternsToCopy = function(files, src, dist) {
    const path = require('path');
    
    return files.map(filename => ({
        from: path.join(__dirname, src, filename),
        to: path.join(__dirname, dist)
    }));
}

/* pathnames */

const getExtensionType = function(ext) {
    if (/js|jsx|ts/.test(ext)) return 'scripts';
    if (/(c|sa|sc)ss/.test(ext)) return 'styles';
    if (/png|jpg|svg|gif/.test(ext)) return 'images';
    if (/ttf|woff2?|eot/.test(ext)) return 'fonts';
    return 'assets';
}

exports.getPathName = function(ext) {
    if (isDev) {
        return exports.getFileName(ext);
    }
    const { dirnames, fileNamePatterns } = require('./config');
    const pattern = fileNamePatterns['production'];
    const dirname = dirnames[getExtensionType(ext)];
    
    return `${dirname}/${pattern}.${ext}`;
}

exports.getPathNames = function(src) {
    const path = require('path');
    const { mapValues } = require('lodash');
    const { dirnames } = require('./config');
    
    return mapValues(dirnames, dirname => path.relative(src, dirname));
}