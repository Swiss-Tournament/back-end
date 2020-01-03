require('dotenv').config();

module.exports = {
  development: {
    // client: 'pg',
    // connection: {
    //   host: process.env.DB_HOST,
    //   database: process.env.DB_NAME,
    //   user: process.env.DB_USER,
    //   password: process.env.DB_PASS,
    // },
    client: 'sqlite3',
    connection: {
      filename: './database/mtg.db3',
    },
    pool: {
      afterCreate: (conn, done) => {
        conn.run('PRAGMA foreign_keys = ON', done);
      },
    },
    useNullAsDefault: true,
    migrations: {
      directory: './database/migrations',
    },
    seeds: { directory: './database/seeds' },
  },
  production: {
    client: 'pg', // Install this package
    connection: process.env.DATABASE_URL,
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      directory: './database/migrations',
    },
    seeds: {
      directory: './database/seeds',
    },
  },
};
