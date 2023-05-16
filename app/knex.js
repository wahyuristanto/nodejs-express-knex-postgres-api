const env = process.env.NODE_ENV || 'development'
const config = require('../knexfile')[env]
const knex = require('knex')(config)

//  TODO: Add logger
//  knex.on('query', (data) => {
//      logger.debug(data.sql, data.bindings)
//  })
module.exports = knex
