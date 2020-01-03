exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('admins')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('admins').insert([
        { event_id: 1, user_id: 3 },
        { event_id: 2, user_id: 34 },
        { event_id: 3, user_id: 3 },
        { event_id: 4, user_id: 49 },
        { event_id: 5, user_id: 12 },
        { event_id: 6, user_id: 26 },
        { event_id: 1, user_id: 96 },
        { event_id: 2, user_id: 15 },
        { event_id: 3, user_id: 43 },
        { event_id: 4, user_id: 95 },
        { event_id: 5, user_id: 23 },
        { event_id: 6, user_id: 56 },
      ]);
    });
};
