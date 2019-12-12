exports.up = (knex: any, promise: Promise<any>) => {
  return knex.schema.createTable("users", (t: any) => {
    t.increments("id").primary();
    t.string("username");
    t.string("fullname");
    t.string("email");
    t.string("role").defaultTo("CLIENT");
    t.string("phone_number");
    t.string("image_url");
    t.string("bio");
    t.integer("height");
    t.integer("weight");
    t.integer("goal_id")
      .unsigned()
      .index()
      .references("id")
      .inTable("goals");
    t.integer("food_preference_id")
      .unsigned()
      .index()
      .references("id")
      .inTable("food_preferences");
    t.string("remarks");
    t.timestamps();
  });
};
exports.down = (knex: any, promise: Promise<any>) => {
  return knex.schema.dropTable("users");
};
