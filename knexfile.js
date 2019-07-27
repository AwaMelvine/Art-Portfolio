require('dotenv').config();


module.exports = {

  development: {
    client: 'postgresql',
    connection: process.env.DATABASE_URL,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: './api/db/migrations/',
      tableName: 'knex_migrations'
    },
    seeds: {
      directory: './api/db/seeds',
    }
  },

  testing: {
    client: 'postgresql',
    connection: process.env.TEST_DATABASE_URL,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: './api/db/migrations/',
      tableName: 'knex_migrations'
    },  
    seeds: {
      directory: './api/db/seeds',
    }
  },

  production: {
    client: 'postgresql',
    connection: process.env.DATABASE_URL,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: './api/db/migrations/',
      tableName: 'knex_migrations'
    },
    seeds: {
      directory: './api/db/seeds',
    }
  }

};
