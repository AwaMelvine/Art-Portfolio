exports.up = function (knex) {
    return knex.schema.createTable('posts', table => {
        table.increments();
        table.string('title').unique().notNullable();
        table.integer('user_id')
            .unsigned()
            .references('id')
            .inTable('users')
            .onDelete('CASCADE')
            .onUpdate('CASCADE');
        table.text('description').notNullable();
        table.string('image');
        table.timestamp('created_at').defaultTo(knex.fn.now())
        table.timestamp('updated_at');
    });
};

exports.down = function (knex) {
    return knex.schema.dropTableIfExists('posts');
};
