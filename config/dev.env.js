'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  CLIENT_SECRET: '"oUQSDO4lbpfE2JJMqFKDgxLYJGiqkPCYBbeURqXH"'
})
