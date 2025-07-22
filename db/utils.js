const db = require("./connection");

function convertObjToArr(dataObj) {
  const dataArr = dataObj.map((object) => {
    const mutableObj = { ...object };
    return Object.values(mutableObj);
  });
  return dataArr;
}

async function attachUserID(dataObj) {
  const { rows: userDetails } = await db.query(
    `SELECT user_id, CONCAT(first_name, ' ',surname) AS host_name FROM users AS user_details`
  );

  const dataWithID = dataObj.map((row) => {
    const mutableRow = { ...row };
    userDetails.forEach((user) => {
      if (mutableRow.host_name === user.host_name) {
        mutableRow.host_id = user.user_id;
      }
    });
    return mutableRow;
  });

  const reorderedDataWithID = dataWithID.map(
    ({
      host_id,
      name,
      property_type,
      location,
      price_per_night,
      description,
    }) => [host_id, name, property_type, location, price_per_night, description]
  );

  return reorderedDataWithID;
}

module.exports = { convertObjToArr, attachUserID };
