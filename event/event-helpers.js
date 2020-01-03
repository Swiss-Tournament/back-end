const db = require('../database/db-config.js');

/** ==================================================================== */
/** =================### EVENT HELPERS ###============================= */
/** ================================================================== */

// be able to pull all active events and output: Event ID & Location

function find() {
  return db('events');
}

function findLocation() {
  return db('events').select(['id', 'date', 'name', 'location', 'lat', 'lng']);
}

function findByAdminId(id) {
  return db('admins')
    .where({ 'user_id': id })
    .select('event_id')
}

function findByPlayerId(id) {
  return db('player')
    .where({ 'user_id': id })
    .select('event_id')
}

function findByEventId(id) {
  return db('events')
    .where({ id })
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
  findByAdminId,
  findByPlayerId,
  // findBy,
  findByEventId,
  // remove,
};
