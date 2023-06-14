/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("mountains", (table) => {
    table.increments("id").primary();
    table.string("name").notNullable();
    table.string("lat").notNullable();
    table.string("lon").notNullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("mountains");
};
