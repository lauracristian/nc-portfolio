const db = require("./connection");
const format = require("pg-format");
const {
  propertyTypesData,
  usersData,
  propertiesData,
  reviewsData,
  imagesData,
  favouritesData,
  bookingsData,
} = require("./data/test/index.js");
const dropTables = require("./dropTables.js");
const createTables = require("./createTables.js");

async function seed() {
  await dropTables();
  await createTables();

  const propertyTypesArr = propertyTypesData.map(
    ({ property_type, description }) => [property_type, description]
  );

  await db.query(
    format(
      `INSERT INTO property_types(property_type, description) VALUES %L`,
      propertyTypesArr
    )
  );

  const usersArr = usersData.map(
    ({ first_name, surname, email, phone_number, is_host, avatar }) => [
      first_name,
      surname,
      email,
      phone_number,
      is_host,
      avatar,
    ]
  );

  const { rows: users } = await db.query(
    format(
      `INSERT INTO users(first_name, surname, email, phone_number, is_host, avatar ) VALUES %L RETURNING user_id, CONCAT(first_name, ' ',surname) AS host_name;`,
      usersArr
    )
  );

  const userDetails = {};
  users.forEach((user) => {
    userDetails[user.host_name] = user.user_id;
  });

  const mutablePropertiesData = [...propertiesData];

  const propertiesWithHostID = mutablePropertiesData.map((property) => {
    const hostID = userDetails[property.host_name];

    const { name, property_type, location, price_per_night, description } =
      property;

    return [
      hostID,
      name,
      property_type,
      location,
      price_per_night,
      description,
    ];
  });

  const { rows: properties } = await db.query(
    format(
      `INSERT INTO properties (host_id, name, property_type, location, price_per_night, description) VALUES %L RETURNING property_id, name as property_name`,
      propertiesWithHostID
    )
  );

  const propertyDetails = {};
  properties.forEach((property) => {
    propertyDetails[property.property_name] = property.property_id;
  });

  const mutableReviewsData = [...reviewsData];
  const formattedReviewsData = mutableReviewsData.map((review) => {
    guestID = userDetails[review.guest_name];
    propertyID = propertyDetails[review.property_name];

    const { rating, comment, created_at } = review;

    return [propertyID, guestID, rating, comment, created_at];
  });

  await db.query(
    format(
      `INSERT INTO reviews (property_id, guest_id, rating, comment, created_at) VALUES %L`,
      formattedReviewsData
    )
  );

  const mutableImagesData = [...imagesData];
  const formattedImagesData = mutableImagesData.map((image) => {
    propertyID = propertyDetails[image.property_name];

    const { image_url, alt_tag } = image;
    return [propertyID, image_url, alt_tag];
  });

  await db.query(
    format(
      `INSERT INTO images (property_id, image_url, alt_text) VALUES %L`,
      formattedImagesData
    )
  );

  const mutableFavouritesData = [...favouritesData];
  const formattedFavouritesData = mutableFavouritesData.map((favourite) => {
    guestID = userDetails[favourite.guest_name];
    propertyID = propertyDetails[favourite.property_name];

    return [guestID, propertyID];
  });

  await db.query(
    format(
      `INSERT INTO favourites (guest_id, property_id) VALUES %L`,
      formattedFavouritesData
    )
  );

  const mutableBookingsData = [...bookingsData];
  const formattedBookingsData = mutableBookingsData.map((booking) => {
    guestID = userDetails[booking.guest_name];
    propertyID = propertyDetails[booking.property_name];

    const { check_in_date, check_out_date } = booking;

    return [propertyID, guestID, check_in_date, check_out_date];
  });

  await db.query(
    format(
      `INSERT INTO bookings (property_id, guest_id, check_in_date, check_out_date) VALUES %L`,
      formattedBookingsData
    )
  );

  const flatAmenitiesData = mutablePropertiesData.flatMap(
    ({ amenities }) => amenities
  );

  const uniqueAmenities = [...new Set(flatAmenitiesData.flat())];

  const formattedAmenitiesData = uniqueAmenities.map((amenity) => [amenity]);

  await db.query(
    format(`INSERT INTO amenities (amenity) VALUES %L`, formattedAmenitiesData)
  );
}

module.exports = seed;
