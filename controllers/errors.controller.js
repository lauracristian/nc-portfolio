exports.handleInvalidURL = (req, res, next) => {
  res.status(404).send({ msg: "URL not found" });
};

exports.handleWrongDataType = (err, req, res, next) => {
  if (err.code === "22P02") {
    res.status(400).send({ msg: "Wrong data type" });
  } else {
    next(err);
  }
};

exports.handleCustomErrors = (err, req, res, next) => {
  if (err.status && err.msg) {
    res.status(err.status).send({ msg: err.msg });
  } else {
    next(err);
  }
};
