const { propertyTypesData, usersData } = require("./data/test/index.js");

function convertObjToArr(dataObj) {
  const dataArr = dataObj.map((object) => {
    const mutableObj = { ...object };
    return Object.values(mutableObj);
  });
  return dataArr;
}

module.exports = convertObjToArr;
