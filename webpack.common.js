const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin')
const path = require('path')
const dist = path.resolve(__dirname, './static');

const pathsToClean = [
  path.resolve(dist, 'css'),
  path.resolve(dist, 'js')
]

// const NODE_ENV = process.env.NODE_ENV || 'development'

module.exports = {
    'entry': './index.js',
    'module': {
        'rules': [
          {
            'test': /\.vue$/,
            'use': 'vue-loader'
          },
          {
            'test': /\.css$/,
            'use': ExtractTextPlugin.extract('css-loader')
          },
          {
            'test': /\.(js|jsx)$/,
            'use': 'babel-loader'
          }
        ]
    },
    'output': {
        'path': dist,
        'publicPath': '/static/',
        'filename': 'js/common_[hash].js'
    },
    'plugins': [
        new HtmlWebpackPlugin({
            'filename': path.resolve(dist, 'html/index.html'),
            'template': 'index.html'
        }),
        new ExtractTextPlugin('css/style_[hash].css'),
        new CleanWebpackPlugin(pathsToClean),
        new CompressionPlugin({
            'algorithm': 'gzip',
            'asset': '[path].gz',
            'minRatio': 0.8,
            'test': /\.js$|\.css$/,
            'threshold': 10240
        })
    ],
    'resolve': {alias: {vue: 'vue/dist/vue.js'}}
}
