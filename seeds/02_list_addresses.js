exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('addresses').del()
    .then(function () {
      // Inserts seed entries
      return knex('addresses').insert([
        {
          country_id: 1,
          name: 'Prague Address',
          street: "Slavie 1527/3",
          city: 'Prague',
          zip: '100 00'
        },
        {
          country_id: 2,
          name: 'Poland Address',
          street: "Bażancia 38",
          city: 'Warszawa',
          zip: '02-892'
        },
        {
          country_id: 3,
          name: 'France Address',
          street: "7 Rue de la Civadière",
          city: 'Ussel',
          zip: '192 00'
        }
      ]);
    });
};