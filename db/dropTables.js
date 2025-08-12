const db = require("./connection.js");

async function dropTables() {
  await db.query(`DROP TABLE IF EXISTS reviews`);
  await db.query(`DROP TABLE IF EXISTS images`);
  await db.query(`DROP TABLE IF EXISTS favourites`);
  await db.query(`DROP TABLE IF EXISTS bookings`);
  await db.query(`DROP TABLE IF EXISTS properties_amenities`);
  await db.query(`DROP TABLE IF EXISTS properties`);
  await db.query(`DROP TABLE IF EXISTS users`);
  await db.query(`DROP TABLE IF EXISTS property_types`);
  await db.query(`DROP TABLE IF EXISTS amenities`);
}

module.exports = dropTables;
