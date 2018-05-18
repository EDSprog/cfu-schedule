const merge = require('webpack-merge')
const common = require('./webpack.common.js')
const webpack = require('webpack')
const hotModuleReplace = new webpack.HotModuleReplacementPlugin()

module.exports = merge(
   common,
   {
  'devServer': {
    'hot': true,
    'port': 9000,
    'host': '0.0.0.0',
    'open': true,
    'proxy': {
        '/api': {
            'target': 'http://0.0.0.0:8080',
            'changeOrigin': true
        },
        '/static': {
          target: 'http://0.0.0.0:9000',
          pathRewrite: {'^/static': ''}
        },
        '*': {
                'target': 'http://0.0.0.0:9000',
                pathRewrite() {
                  return '/static/html/index.html'
                }
        }
    }
  },
  'devtool': 'source-map',
  'plugins': [hotModuleReplace]
}
)
