const faker = require('faker');

exports.seed = function (knex) {
  return knex('posts')
    .then(function () {
      const posts = [
        {
          title: 'This is the first post',
          user_id: 1,
          description: 'This is the description of the first post.',
          image: faker.image.food()
        },
        {
          title: 'This is the second post',
          user_id: 1,
          description: 'This is the description of the second post.',
          image: faker.image.food()
        }
      ];
      return knex('posts').insert(posts);
    });
};
