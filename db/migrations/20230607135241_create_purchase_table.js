/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable("purchase", function (table) {
        table.increments("id").primary(); // Set this column as the primary key
        table.string("timestamp", 14);
        table.date("registration_date");
        table.string("item_name", 512);
        table.integer("quantity");
        table.string("unit", 32);
        table.string("shop_candidate", 128);
        table.date("purchase_date");
    });

};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable("purchase");
};