
exports.up = function(knex) {
    return knex.schema.createTable('countries', t => {
        t.increments('id').primary();
        
        t.string('name').notNullable();

        t.timestamp('created_at').defaultTo(knex.fn.now());
        t.timestamp('updated_at').defaultTo(knex.fn.now());
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('countries');
};
