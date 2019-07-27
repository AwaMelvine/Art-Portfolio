exports.up = function (knex) {
    return knex.schema.createTable('users', table => {
        table.increments();
        table.enu('role', ['artist', 'user', 'admin']).defaultTo('user');
        table.string('username').notNullable();
        table.string('email').unique().notNullable();
        table.string('password').notNullable();
        table.timestamp('created_at').defaultTo(knex.fn.now())
        table.timestamp('updated_at');
    });
};

exports.down = function (knex) {
    return knex.schema.dropTableIfExists('users');
};
