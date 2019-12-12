exports.up = (knex: any, promise: Promise<any>) => {
  return knex.schema.createTable("goals", (t: any) => {
    t.increments("id").primary();
    t.string("goal");
  });
};
exports.down = (knex: any, promise: Promise<any>) => {
  return knex.schema.dropTable("goals");
};
