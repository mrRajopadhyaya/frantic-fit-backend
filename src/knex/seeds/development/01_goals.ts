import * as Knex from "knex";

export async function seed(knex: Knex): Promise<any> {
  // Deletes ALL existing entries
  return knex("goals")
    .del()
    .then(() => {
      // Inserts seed entries
      return knex("goals").insert([
        { id: 1, goals: "rowValue1" },
        { id: 2, goals: "rowValue2" },
        { id: 3, goals: "rowValue3" }
      ]);
    });
}
