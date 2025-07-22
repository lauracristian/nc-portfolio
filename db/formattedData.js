const { propertyTypesData, usersData } = require("./data/test/index.js");
const { convertObjToArr } = require("./utils");

const propertyTypesArr = convertObjToArr(propertyTypesData);
const usersArr = convertObjToArr(usersData);

module.exports = {
  propertyTypesArr,
  usersArr,
};
