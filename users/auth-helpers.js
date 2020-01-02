const db = require('../database/db-config.js');

function find() {
  return db('users').select('id', 'username', 'password');
}

function findBy(filter) {
  return db('users').where(filter);
}

function findById(id) {
  return db('users')
    .where({ id })
    .first();
}

function add(user) {
  return db('users')
    .insert(user, 'id')
    .returning('*');
}

function update(id, load) {
  return db('users')
    .where({ id })
    .update(load)
    .returning('*');
}

function remove(id) {
  return db('users')
    .where({ id })
    .del();
}

module.exports = {
  add,
  update,
  find,
  findBy,
  findById,
  remove,
};
