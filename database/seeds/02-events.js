exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('events')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('events').insert([
        {
          name: "Brenda's French Soul Food",
          location: '652 Polk St, San Francisco, CA 94102',
          lat: 37.786654,
          lng: -122.412085,
          public: true,
          date: new Date(2020, 2, 14, 13, 0, 0),
          gameFormat: 'Standard',
        },
        {
          name: 'Mr. Holmes Bakehouse',
          location: '1042 Larkin St, San Francisco, CA 94109',
          lat: 37.787314,
          lng: -122.415175,
          public: true,
          date: new Date(2020, 3, 17, 12, 30, 0),
          gameFormat: 'Standard',
        },
        {
          name: 'UC Hastings College of the Law',
          location: '200 McAllister St, San Francisco, CA 94102',
          lat: 37.781156,
          lng: -122.417351,
          public: true,
          date: new Date(2020, 4, 1, 13, 0, 0),
          gameFormat: 'Standard',
        },
        {
          name: 'Lambda Headquarters',
          location: '250 Montgomery St, San Francisco, CA 94104',
          lat: 37.791679,
          lng: -122.402348,
          public: true,
          date: new Date(2020, 5, 28, 14, 0, 0),
          gameFormat: 'Standard',
        },
        {
          name: 'Fogo de Chão Brazilian Steakhouse',
          location: '201 S, 3rd St Suite 100, San Francisco, CA 94103',
          lat: 37.784708,
          lng: -122.406043,
          public: true,
          date: new Date(2020, 6, 14, 18, 0, 0),
          gameFormat: 'Standard',
        },
        {
          name: 'Don Pistos',
          location: '510 Union St, San Francisco, CA 94133',
          lat: 37.798477,
          lng: -122.405533,
          public: true,
          date: new Date(2020, 7, 3, 11, 0, 0),
          gameFormat: 'Standard',
        },
        {
          name: 'All Star Donuts',
          location: '399 5th St, San Francisco, CA 94107',
          lat: 37.778865,
          lng: -122.402807,
          public: true,
          date: new Date(2020, 8, 31, 14, 0, 0),
          gameFormat: 'Standard',
        },
      ]);
    });
};
