exports.up = function (knex) {
  return knex.schema
    .createTable('events', tbl => {
      tbl.increments();
      tbl
        .string('name')
        .notNullable()
        .unique();
      tbl
        .string('location', 255) // what form is the data for location
        .notNullable();
      tbl.float('lat', 6).notNullable();
      tbl.float('lng', 6).notNullable();
      // admins is a seperate table tied in by event ID
      tbl.boolean('public').notNullable();
      tbl.boolean('complete').defaultTo(false);
      tbl.dateTime('date').notNullable();
      // player list will be a table that connects using the event ID
      tbl.string('gameFormat', 255).notNullable();
      tbl.string('eventNotes', 2500);
      tbl.integer('maxPlayers');
      tbl.integer('roundEndTime');
      tbl.integer('currentRound');
      tbl.integer('maxRounds');
    })
    .createTable('admins', tbl => {
      tbl
        .integer('event_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('events')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      tbl
        .integer('user_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      tbl.primary(['event_id', 'user_id']);
    })
    .createTable('playerList', tbl => {
      tbl
        .integer('user_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      tbl
        .integer('event_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('events')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      tbl.integer('points'); // Every match win is 3 points every match drawn is 1 point

      tbl.integer('gamesPlayed');
      tbl.integer('gamesWon');
      tbl.integer('gamesTied');

      tbl.integer('matchesPlayed');
      tbl.integer('matchesWon');
      tbl.integer('matchesTied');

      tbl.primary(['event_id', 'user_id']);

      // OMW - (Opponents Matches Won/Opponents Total Matches Played)
      // GW - (Games Won/Games Played)
      // OGW - (Opponents Games Won/Opponents Total Games Played)
    })
    .createTable('match', tbl => {
      tbl.increments();
      tbl
        .integer('event_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('events')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      tbl.integer('gamesPlayed');
      tbl.integer('player1_score');
      tbl.integer('player2_score');
      tbl.string('matchResults');
    })
    .createTable('pairings', tbl => {
      tbl
        .integer('match_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('match')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      tbl
        .integer('player1_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      tbl
        .integer('player2_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      tbl.primary(['match_id', 'player1_id', 'player2_id']);
    })
    .createTable('game', tbl => {
      tbl.increments();
      tbl.integer('player1_score');
      tbl.integer('player2_score');
      tbl.string('matchResults');
      tbl
        .integer('match_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('match')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
    });
};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists('game')
    .dropTableIfExists('pairings')
    .dropTableIfExists('master')
    .dropTableIfExists('playerList')
    .dropTableIfExists('admins')
    .dropTableIfExists('events');
};
