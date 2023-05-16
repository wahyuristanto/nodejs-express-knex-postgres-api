/* global beforeAll, afterAll */
process.env.LOG_LEVEL = 'error'
const knex = require('../server/knex')

beforeAll(async () => {
    const res = await knex.migrate.rollback().then(() => {
        return knex.migrate.latest().then(() => {
            return knex.seed.run()
        })
    })
    return res
})

afterAll(async () => {
    return await knex.destroy()
})
