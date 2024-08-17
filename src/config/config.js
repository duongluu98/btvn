require("dotenv").config();
const pg = require("pg");
const { DB_HOST, DB_USERNAME, DB_PASSWORD, DB_DATABASE, DB_PORT, DB_DRIVER } =
  process.env;
module.exports = {
  development: {
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_DATABASE,
    host: DB_HOST,
    port: DB_PORT,
    dialect: DB_DRIVER,
    dialectOptions: {
      ssl: {
        require: true,
      },
    },
    dialectModule: pg,
  },
  test: {
    username: "root",
    password: null,
    database: "database_test",
    host: "127.0.0.1",
    dialect: "mysql",
    dialectOptions: {
      ssl: {
        require: true,
      },
    },
    dialectModule: pg,
  },
  production: {
    username: "root",
    password: null,
    database: "database_production",
    host: "127.0.0.1",
    dialect: "mysql",
    dialectOptions: {
      ssl: {
        require: true,
      },
    },
    dialectModule: pg,
  },
};
