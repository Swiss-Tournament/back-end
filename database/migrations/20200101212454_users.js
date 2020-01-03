exports.up = function(knex) {
  return knex.schema.createTable('users', tbl => {
    tbl.increments();
    tbl
      .string('email', 255)
      .notNullable()
      .unique();
    tbl
      .string('username', 255)
      .notNullable()
      .unique();
    tbl.string('firstName', 255).notNullable();
    tbl.string('lastName', 255).notNullable();
    tbl.string('password', 255).notNullable();
    tbl.string('location', 255);
    tbl.float('lat', 6);
    tbl.float('lng', 6);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('users');
};
