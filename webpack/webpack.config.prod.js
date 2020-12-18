const config = {
    mode: 'production',
    entry: {
        polyfills: '@babel/polyfill'
    },
    optimization: {
        minimizer: [
            new (require('optimize-css-assets-webpack-plugin'))(),
            new (require('terser-webpack-plugin'))()
        ]
    }
}

module.exports = config;