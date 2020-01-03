const db = require('../database/db-config.js');

/** ==================================================================== */
/** =================### EVENT FIND HELPERS ###============================= */
/** ================================================================== */

// be able to pull all active events and output: Event ID & Location

function find() {
  return db('events');
}

function findLocation() {
  return db('events').select(['id', 'date', 'name', 'location', 'lat', 'lng']);
}

function findByEventId(id) {
  return db('events').where({ id });
}

function joinAdmin(id) {
  return db('events')
    .innerJoin('admins', 'events.id', 'admins.event_id')
    .where({ 'admins.user_id': id })
}

function joinPlayer(id) {
  return db('events')
    .innerJoin('playerList', 'events.id', 'playerList.event_id')
    .where({ 'playerList.user_id': id })
}

/** ==================================================================== */
/** =================### EVENT ADD HELPERS ###============================= */
/** ================================================================== */

function addEvent(event) {
  return db('events')
    .insert(event, 'id')
    .returning('id')
}

function addAdmin({ event_id, user_id }) {
  return db('admins')
    .insert({ event_id: event_id, user_id: user_id })
}

function addPlayer(event) {
  return db('events')
    .insert(event, 'id')
    .returning('*');
}

/** ==================================================================== */
/** =================### EVENT Update HELPERS ###============================= */
/** ================================================================== */

function update(id, load, what) {
  return db(what)
    .where({ id: id })
    .update(load)
}

/** ==================================================================== */
/** =================### EVENT Update HELPERS ###============================= */
/** ================================================================== */

function remove(id, what) {
  return db(what)
    .where({ id: id })
    .del()
}
module.exports = {
  addEvent,
  addAdmin,
  addPlayer,
  joinAdmin,
  update,
  find,
  findLocation,
  joinPlayer,
  // findBy,
  findByEventId,
  remove,
};
