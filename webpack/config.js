/* pathnames */

exports.dirnames = {
    src: 'src',
    dist: 'dist',
    images: 'images',
    assets: 'assets'
}

exports.fileNamePatterns = {
    development: '[name]',
    production: '[name].[hash:5]',
    stats: '[name].[hash:5]'
}

exports.filesToBeCopy = ['favicon.ico'];

exports.template = './index.html';

/* dependencies */

exports.aliases = {
    _: 'lodash'
};

/* devServer */

exports.port = 3000;