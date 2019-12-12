exports.up = (knex: any, promise: Promise<any>) => {
  return knex.schema.createTable("food_preferences", (t: any) => {
    t.increments("id").primary();
    t.string("food_preference");
  });
};
exports.down = (knex: any, promise: Promise<any>) => {
  return knex.schema.dropTable("food_preferences");
};
