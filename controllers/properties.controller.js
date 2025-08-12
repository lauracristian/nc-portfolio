const {
  selectAllProperties,
  selectAllPropertiesByID,
  selectReviewsByPropertyID,
  selectAllUsersByID,
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

exports.getAllPropertiesByID = async (req, res, next) => {
  const { id } = req.params;
  const { user_id } = req.query;

  try {
    const properties = await selectAllPropertiesByID(id);

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
