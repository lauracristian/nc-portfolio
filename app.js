const express = require("express");
const {
  getAllProperties,
  getAllPropertiesByID,
  getReviewsByPropertyID,
  getUsersByID,
} = require("./controllers/properties.controller");
const {
  handleInvalidURL,
  handleWrongDataType,
  handleCustomErrors,
} = require("./controllers/errors.controller");

const app = express();

app.get("/api/properties", getAllProperties);
app.get("/api/properties/:id", getAllPropertiesByID);
app.get("/api/properties/:id/reviews", getReviewsByPropertyID);
app.get("/api/users/:id", getUsersByID);

app.all("/*invalid", handleInvalidURL);
app.use(handleWrongDataType);
app.use(handleCustomErrors);

module.exports = app;
