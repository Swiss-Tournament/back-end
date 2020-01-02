const bcrypt = require('bcryptjs');
const faker = require('faker');

const data = [];
// eslint-disable-next-line no-plusplus
for (let i = 0; i < 100; i++) {
  data.push({
    email: faker.internet.email(),
    username: faker.internet.userName(),
    password: bcrypt.hashSync('mtgpassword', 8),
  });
}
console.log(data);

exports.seed = knex =>
  knex('users')
    .del()
    .then(() => knex('users').insert(data));
