const db = require('../database/db-config.js');

/** ==================================================================== */
/** =================### EVENT HELPERS ###============================= */
/** ================================================================== */

// be able to pull all active events and output: Event ID & Location

function find() {
  return db('events');
}

function findLocation() {
  return db('events').select(['id', 'name', 'location', 'lat', 'lng'])
}

// function findBy(filter) {
//     return db('users').where(filter);
// }

// function findById(id) {
//     return db('users')
//         .where({ id })
//         .select(['id', 'email', 'username', 'location'])
//         .first();
// }

// function add(user) {
//     return db('users')
//         .insert(user, 'id')
//         .returning('*');
// }

// function update(id, load) {
//     return db('users')
//         .where({ id })
//         .update(load)
//         .returning(['id', 'email', 'username', 'location']);
// }

// function remove(id) {
//     return db('users')
//         .where({ id })
//         .del();
// }

module.exports = {
  // add,
  // update,
  find,
  findLocation,
  // findBy,
  // findById,
  // remove,
};
