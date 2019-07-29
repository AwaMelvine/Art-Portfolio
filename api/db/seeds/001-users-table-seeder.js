const bcrypt = require('bcryptjs');

exports.seed = function (knex) {
  return knex('users')
    .then(function () {
      return knex('users').insert([
        {
          role: 'artist',
          username: 'Awa',
          email: 'awa@awa.com',
          password: bcrypt.hashSync('mel', 12)
        },
        {
          role: 'user',
          username: 'John',
          email: 'john@john.com',
          password: bcrypt.hashSync('mel', 12)
        }
      ]);
    });
};
