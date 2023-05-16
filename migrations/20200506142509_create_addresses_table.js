
exports.up = function(knex) {
    return knex.schema.createTable('addresses', t => {
        t.increments('id').primary();

        t.integer('country_id').references('id').inTable('countries');

        t.string('name').notNullable();
        t.string('street').notNullable();
        t.string('city').notNullable();
        t.string('zip').notNullable();
        
        t.timestamp('deleted_at').defaultTo(null);
        t.timestamp('created_at').defaultTo(knex.fn.now());
        t.timestamp('updated_at').defaultTo(knex.fn.now());
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('addresses');
};
