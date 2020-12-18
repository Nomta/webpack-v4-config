const { port } = require('./config');

module.exports = {
    mode: 'development',
    devServer: { /* contentBase: './', */ port, hot: true },
    devtool: 'source-map'
}