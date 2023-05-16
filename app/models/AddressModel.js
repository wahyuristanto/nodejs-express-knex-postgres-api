const knex = require('../knex')
const TABLE = 'addresses'

exports.all = () => {
    return knex.select(
        'addresses.id',
        'addresses.name AS address_name',
        'addresses.street AS address_street',
        'addresses.city AS address_city',
        'addresses.zip AS address_zip',
        'countries.id as country_id',
        'countries.name as country_name',
    )
    .from(TABLE)
    .where({ 'addresses.deleted_at': null })
    .leftJoin('countries', 'addresses.country_id', 'countries.id')
    .orderBy('addresses.id', 'asc')
    .then((data) => {
        var results = [];

        data.forEach((value) => {
            results.push({
                id: value.id,
                name: value.address_name,
                street: value.address_street,
                city: value.address_city,
                zip: value.address_zip,
                country: {
                    id: value.country_id,
                    name: value.country_name
                }
            });
        });
        
        return results;
      }, {})
}

exports.find = (id) => {
    return knex.select(
        'addresses.id',
        'addresses.name AS address_name',
        'addresses.street AS address_street',
        'addresses.city AS address_city',
        'addresses.zip AS address_zip',
        'countries.id as country_id',
        'countries.name as country_name',
    )
    .from(TABLE)
    .where({ 'addresses.id': id })
    .where({ 'addresses.deleted_at': null })
    .leftJoin('countries', 'addresses.country_id', 'countries.id')
    .then((data) => {
        if (!data[0]) {
            return 
        }
        
        results = {
            id: data[0].id,
            name: data[0].address_name,
            street: data[0].address_street,
            city: data[0].address_city,
            zip: data[0].address_zip,
            country: {
                id: data[0].country_id,
                name: data[0].country_name
            }
        }
        
        return results;
      }, {})
}

exports.create = (address) => {
    return knex(TABLE).insert(address).returning('id')
}

exports.update = (id, data) => {
    return knex(TABLE).where({ id: id }).update(data).update('updated_at', knex.fn.now()).returning('id')
}

exports.delete = (id) => {
    return knex(TABLE).where({ id: id }).update('deleted_at', knex.fn.now())
}