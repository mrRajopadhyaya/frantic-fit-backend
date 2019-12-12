const knexfile = require("../../knexfile");
import knex from "knex";

const environment = process.env.ENVIRONMENT || "development";

const knexEnvironment = knexfile[environment];
const knexConfig = knex(knexEnvironment);

export default knexConfig;
