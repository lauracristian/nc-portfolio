const {
  selectAllProperties,
  selectPropertyByID,
  selectReviewsByPropertyID,
  selectAllUsersByID,
  insertPropertyReviewByUserID,
  insertPropertyReviewByUser,
  selectAllUsers,
  selectAllImages,
} = require("../models/properties.model");

exports.getAllProperties = async (req, res, next) => {
  const { maxprice, minprice, property_type } = req.query;

  if (property_type !== undefined && !isNaN(property_type)) {
    return res.status(400).send({ msg: "Wrong data type" });
  }

  try {
    const properties = await selectAllProperties(
      maxprice,
      minprice,
      property_type
    );

    if (properties.properties.length === 0) {
      res.status(200).send({ msg: "No matching properties" });
    } else {
      res.status(200).send(properties);
    }
  } catch (error) {
    next(error);
  }
};

exports.getPropertyByID = async (req, res, next) => {
  const { id } = req.params;
  const { user_id } = req.query;

  try {
    const properties = await selectPropertyByID(id);

    res.status(200).send(properties);
  } catch (error) {
    next(error);
  }
};

exports.getReviewsByPropertyID = async (req, res, next) => {
  const { id } = req.params;
  try {
    const reviews = await selectReviewsByPropertyID(id);
    res.status(200).send(reviews);
  } catch (err) {
    next(err);
  }
};

exports.getUsersByID = async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await selectAllUsersByID(id);
    res.status(200).send({ user });
  } catch (error) {
    next(error);
  }
};

exports.addPropertyReviewByUser = async (req, res, next) => {
  const { property_id } = req.params;
  const { guest_id, rating, comment } = req.body;

  try {
    const review = await insertPropertyReviewByUser(
      property_id,
      guest_id,
      rating,
      comment
    );

    res.status(201).send(review);
  } catch (err) {
    next(err);
  }
};

exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await selectAllUsers();
    res.status(200).send(users);
  } catch (err) {
    next(err);
  }
};

exports.getAllImages = async (req, res, next) => {
  try {
    const images = await selectAllImages();
    res.status(200).send(images);
  } catch (err) {
    next(err);
  }
};
