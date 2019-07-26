import { config } from 'dotenv';

config();

export default {

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
    }
  }

};
