/* pathnames */

exports.dirnames = {
/* main paths */
    src: 'src',
    dist: 'dist',
/* sub directories */
    assets: 'assets',
    fonts: 'assets',
    images: 'images',
    scripts: 'scripts',
    styles: 'styles'
}

exports.fileNamePatterns = {
    development: '[name]',
    production: '[name].[hash:5]',
    stats: '[name].[hash:5]'
}

exports.filesToBeCopy = [];

exports.template = './index.html';

/* dependencies */

exports.alias = {
    lodash: 'lodash'
};

/* devServer */

exports.port = 3000;