exports.up = function (knex) {
    return knex.schema
        .createTable('events', tbl => {
            tbl.increments();
            tbl.string('scoreboard_id', 255) // come back to this one
            tbl
                .string('location_id', 255) // what form is the data for location
                .notNullable()
            // admins is a seperate table tied in by event ID
            tbl.boolean('public').notNullable();
            tbl.boolean('complete').notNullable();
            tbl.integer('date');
            tbl.integer('time');
            //player list will be a table that connects using the event ID
            tbl.string('gameFormat', 255).notNullable();
            tbl.string('eventNotes', 2500)
            tbl.integer('maxPlayers')
            tbl.integer('roundEndTime')
            tbl.integer('currentRound')
            tbl.integer('maxRounds')
        })
        .createTable('admin', tbl => {
            tbl.increments();
            tbl.string('username').notNullable();
            tbl
                .integer('event_id')
                .notNullable()
                .references('id')
                .inTable('events')
                .onUpdate('CASCADE')
                .onDelete('CASCADE')
        })
        .createTable('playerList', tbl => {
            tbl.increments();
            tbl.string('username').notNullable();
            tbl
                .integer('event_id')
                .notNullable()
                .references('id')
                .inTable('events')
                .onUpdate('CASCADE')
                .onDelete('CASCADE')
        })
};

exports.down = function (knex) {
    return knex.schema
        .dropTableIfExists('events')
        .dropTableIfExists('admin')
        .dropTableIfExists('playerList')
};
