const knex = require('../knex')
const TABLE = 'countries'

exports.all = () => {
    return knex.select(
        'countries.id',
        'countries.name AS country_name',
    )
    .from(TABLE)
    .orderBy('countries.id', 'asc')
    .then((data) => {
        var results = [];

        data.forEach((value) => {
            results.push({
                id: value.id,
                name: value.country_name
            });
        });
        
        return results;
      }, {})
}

exports.find = (id) => {
    return knex.select(
        'countries.id',
        'countries.name AS country_name',
    )
    .from(TABLE).where({ 'countries.id': id })
    .then((data) => {
        if (!data[0]) {
            return 
        }
        
        results = {
            id: data[0].id,
            name: data[0].country_name
        }
        
        return results;
      }, {})
}