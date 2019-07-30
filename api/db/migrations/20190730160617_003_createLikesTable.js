
exports.up = function (knex) {
    return knex.schema.createTable('likes', table => {
        table.increments();
        table.integer('post_id')
            .unsigned()
            .notNullable()
            .references('id')
            .inTable('posts')
            .onDelete('CASCADE')
            .onUpdate('CASCADE');
        table.integer('user_id')
            .unsigned()
            .notNullable()
            .references('id')
            .inTable('users')
            .onDelete('CASCADE')
            .onUpdate('CASCADE');
        table.unique(['post_id', 'user_id']);
    });
};

exports.down = function (knex) {
    return knex.schema.dropTableIfExists('likes');
};
