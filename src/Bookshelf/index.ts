import knexConfig from "../knex/knex";

const Bookshelf: any = require("bookshelf")(knexConfig);
export default Bookshelf;
