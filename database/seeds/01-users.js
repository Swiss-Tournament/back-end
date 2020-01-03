const bcrypt = require('bcryptjs');
const faker = require('faker');

const data = [];
// eslint-disable-next-line no-plusplus
for (let i = 0; i < 100; i++) {
  data.push({
    email: faker.internet.email(),
    username: faker.internet.userName(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    password: bcrypt.hashSync('mtgpassword', 8),
  });
}

data.push({
  email: 'user@user.com',
  username: 'testuser',
  firstName: 'Your',
  lastName: 'Momma',
  password: bcrypt.hashSync('password'),
});

exports.seed = knex =>
  knex('users')
    .del()
    .then(() => knex('users').insert(data));
