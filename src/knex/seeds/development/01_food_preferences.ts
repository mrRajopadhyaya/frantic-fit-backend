import * as Knex from "knex";

export async function seed(knex: Knex): Promise<any> {
  // Deletes ALL existing entries
  return knex("food_preferences")
    .del()
    .then(() => {
      // Inserts seed entries
      return knex("food_preferences").insert([
        { id: 1, food_preference: "rowValue1" },
        { id: 2, food_preference: "rowValue2" },
        { id: 3, food_preference: "rowValue3" }
      ]);
    });
}
