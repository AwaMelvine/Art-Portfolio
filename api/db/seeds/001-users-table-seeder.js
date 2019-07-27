
exports.seed = function (knex) {
  return knex('users').truncate()
    .then(function () {
      return knex('users').insert([
        { role: 'artist', username: 'Awa', email: 'awa@awa.com', password: 'mel' },
        { role: 'admin', username: 'Melvine', email: 'melvine@melvine.com', password: 'mel' },
        { role: 'user', username: 'John', email: 'john@john.com', password: 'mel' }
      ]);
    });
};
