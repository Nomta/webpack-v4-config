const { merge } = require('lodash');
const config =  require('./webpack/webpack.config.common')

const isDev = process.env.NODE_ENV === 'development';

module.exports = merge(isDev ? 
    require('./webpack/webpack.config.dev') : 
    require('./webpack/webpack.config.prod'), 
config);