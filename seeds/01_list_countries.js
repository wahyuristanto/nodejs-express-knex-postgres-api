exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('countries').del()
    .then(function () {
      // Inserts seed entries
      return knex('countries').insert([
        {
          name: 'Czech Republic',
        },
        {
          name: 'Poland',
        },
        {
          name: 'France',
        }
      ]);
    });
};
