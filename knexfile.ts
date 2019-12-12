require("dotenv").config();
const { HOST, DBUSER, PASSWORD, DATABASE } = process.env;
console.log(HOST, DBUSER, PASSWORD, DATABASE, "@@@@Check");
const knexfile = {
  development: {
    client: "postgresql",
    connection: {
      database: DATABASE,
      host: HOST,
      password: PASSWORD,
      user: DBUSER
    },
    migrations: {
      directory: __dirname + "/src/knex/migrations",
      extension: "ts"
    },
    seeds: {
      directory: __dirname + "/src/knex/seeds/development"
    }
  }
  // production: {
  //   client: "postgresql",
  //   connection: {
  //     database: "my_db",
  //     user: "username",
  //     password: "password"
  //   },
  //   pool: {
  //     min: 2,
  //     max: 10
  //   },
  //   migrations: {
  //     tableName: "knex_migrations"
  //   }
  // }
};

module.exports = knexfile;
