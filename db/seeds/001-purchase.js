/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('purchase').del()
  await knex('purchase').insert([
    {
      timestamp: "20230608000000",
      registration_date: '2023-06-08',
      item_name: "アイス",
      purchase_date: '2023-06-08',
      strike_line: true,
    },
    {
      timestamp: "20230608010000",
      registration_date: '2023-06-08',
      item_name: "玉ねぎ",
      strike_line: true,
    },
    {
      timestamp: "20230608020000",
      registration_date: '2023-06-08',
      item_name: "じゃがいも",
      strike_line: false,
    }
  ]);
};
