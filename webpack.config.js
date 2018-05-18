const merge = require('webpack-merge')
const devServer = require('./webpack.dev.js')
const prod = require('./webpack.prod.js')

const NODE_ENV = process.env.NODE_ENV

if (NODE_ENV === 'development') {
    module.exports = merge(devServer)
} else {
    module.exports = merge(prod)
}
