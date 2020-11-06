// Update with your config settings.

module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: './dev.sqlite3'
    },
    " useNullAsDefault " : true ,
    migrations: {
      directory: __dirname + '/src/database/migrations',
  },
  useNullAsDefault: true,
  },

  staging: {
    client: 'postgresql',
    connection: {
      host : '127.0.0.1',
      database: 'play',
      user:     'postgres',
      password: '123456'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: __dirname + '/src/database/migrations',
    }
  },

  production: {
    client: 'pg',
    // The next line is where the application will read that environment variable to connect to the database
    connection: process.env.DATABASE_URL,
    migrations: {
        directory: __dirname + '/src/database/migrations',
    },
    seeds: {
        directory: __dirname + '/db/seeds/production',
    },
}

};
