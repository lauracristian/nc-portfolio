const express = require("express");
const path = require("path");
const {
  getAllProperties,
  getPropertyByID,
  getReviewsByPropertyID,
  getUsersByID,
  addPropertyReviewByUser,
} = require("./controllers/properties.controller");
const {
  handleInvalidURL,
  handleWrongDataType,
  handleCustomErrors,
} = require("./controllers/errors.controller");
const { getAllStaticFiles } = require("./controllers/public.controller");

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.get("/", getAllStaticFiles);

app.get("/api/properties", getAllProperties);
app.get("/api/properties/:id", getPropertyByID);
app.get("/api/properties/:id/reviews", getReviewsByPropertyID);
app.get("/api/users/:id", getUsersByID);

app.post("/api/properties/:property_id/reviews", addPropertyReviewByUser);

app.all("/*invalid", handleInvalidURL);
app.use(handleWrongDataType);
app.use(handleCustomErrors);

module.exports = app;
