const knex = require('knex');
const config = require('../knexfile.js');

const dbEnv = process.env.DB_ENV || 'development';

module.exports = knex(config[dbEnv]);

// Turn on for Tests
// module.exports = knex(knexConfig.development);
