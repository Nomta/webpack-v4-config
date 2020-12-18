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
        from: path.resolve(__dirname, src, filename),
        to: path.resolve(__dirname, dist)
    }));
}