const db = require("../db/connection");

exports.selectAllProperties = async (maxprice, minprice, property_type) => {
  const queryValues = [];
  let queryStr = `
    SELECT 
      properties.property_id, 
      properties.name AS property_name, 
      properties.location, 
      properties.price_per_night, 
      CONCAT(users.first_name, ' ', users.surname) AS host,
      COUNT(favourites.favourite_id) AS favourite_count
    FROM properties
    INNER JOIN users ON properties.host_id = users.user_id
    LEFT JOIN favourites ON properties.property_id = favourites.property_id
`;
  if (maxprice) {
    queryValues.push(maxprice);
    queryStr += ` WHERE properties.price_per_night <= $1`;
  }

  if (minprice) {
    if (queryValues.length > 0) {
      queryStr += ` AND`;
    } else {
      queryStr += ` WHERE`;
    }
    queryValues.push(minprice);
    queryStr += ` properties.price_per_night >= $${queryValues.length}`;
  }

  if (property_type) {
    if (queryValues.length > 0) {
      queryStr += ` AND`;
    } else {
      queryStr += ` WHERE`;
    }
    queryValues.push(property_type);
    queryStr += ` properties.property_type = $${queryValues.length}`;
  }

  queryStr += ` 
    GROUP BY
     properties.property_id,
     users.first_name,
     users.surname
    ORDER BY favourite_count DESC`;

  const { rows } = await db.query(queryStr, queryValues);
  return { properties: rows };
};

exports.selectPropertyByID = async (id) => {
  const { rows } = await db.query(
    `SELECT
       properties.property_id,
       properties.name AS property_name,
       properties.location,
       properties.price_per_night,
       properties.description,
       CONCAT(users.first_name, ' ', users.surname) AS host,
       users.avatar AS host_avatar,
       COUNT(favourites.favourite_id) AS favourite_count
    FROM properties
    INNER JOIN users ON properties.host_id = users.user_id
    LEFT JOIN favourites ON properties.property_id = favourites.property_id
    WHERE properties.property_id = $1
    GROUP BY
       properties.property_id,
       properties.name,
       properties.location,
       properties.price_per_night,
       properties.description,
       users.first_name,
       users.surname,
       users.avatar
  `,
    [id]
  );

  if (!rows.length) {
    return Promise.reject({ status: 404, msg: "Property not found" });
  }

  return rows[0];
};

exports.selectReviewsByPropertyID = async (id) => {
  const { rows } = await db.query(
    `SELECT
    reviews.review_id, reviews.comment, reviews.rating, reviews.created_at,
    CONCAT(users.first_name, ' ', users.surname) AS guest,
    users.avatar AS guest_avatar
    FROM reviews
    INNER JOIN users ON reviews.guest_id = users.user_id
    WHERE reviews.property_id = $1`,
    [id]
  );

  const ratings = rows.map((row) => row.rating);
  const totalRating = ratings.reduce((total, rating) => total + rating);
  const avgRating = totalRating / ratings.length;

  return { reviews: rows, average_rating: avgRating };
};

exports.selectAllUsersByID = async (id) => {
  const { rows } = await db.query(
    `SELECT 
       user_id,
       first_name,
       surname,
       email,
       phone_number,
       avatar,
       created_at
     FROM users
     WHERE user_id = $1`,
    [id]
  );

  if (!rows.length) {
    return Promise.reject({ status: 404, msg: "Results not found" });
  }

  return rows[0];
};

exports.insertPropertyReviewByUser = async (
  property_id,
  guest_id,
  rating,
  comment
) => {
  const queryValues = [property_id, guest_id, rating, comment];
  const { rows } = await db.query(
    `INSERT INTO reviews (property_id, guest_id, rating, comment)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
    queryValues
  );

  return rows[0];
};

exports.selectAllUsers = async () => {
  const { rows } = await db.query(`SELECT * FROM users`);

  return { users: rows };
};

exports.selectAllImages = async () => {
  const { rows } = await db.query(`SELECT * FROM images`);

  return { images: rows };
};
