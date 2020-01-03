exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('events')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('events').insert([
        {
          location: "McDonald's",
          public: true,
          date: new Date(2020, 2, 14, 13, 0, 0),
          gameFormat: 'Standard',
        },
        {
          location: 'Library',
          public: true,
          date: new Date(2020, 3, 17, 12, 30, 0),
          gameFormat: 'Standard',
        },
        {
          location: 'YMCA',
          public: true,
          date: new Date(2020, 4, 1, 13, 0, 0),
          gameFormat: 'Standard',
        },
        {
          location: 'Lambda Headquarters',
          public: true,
          date: new Date(2020, 5, 28, 14, 0, 0),
          gameFormat: 'Standard',
        },
        {
          location: "Dave's Sport Shop",
          public: true,
          date: new Date(2020, 6, 14, 18, 0, 0),
          gameFormat: 'Standard',
        },
        {
          location: 'Best Buy Parking Lot',
          public: true,
          date: new Date(2020, 7, 3, 11, 0, 0),
          gameFormat: 'Standard',
        },
        {
          location: 'Walmart',
          public: true,
          date: new Date(2020, 8, 31, 14, 0, 0),
          gameFormat: 'Standard',
        },
      ]);
    });
};
