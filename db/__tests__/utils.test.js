const convertObjToArr = require("../utils");
describe("utils", () => {
  describe("convertObjToArr", () => {
    test("converts an object inside an array into a nested array", () => {
      const testObjData = [
        {
          property_type: "Apartment",
          description: "Description of Apartment.",
        },
      ];

      const testDataArr = convertObjToArr(testObjData);

      expect(testDataArr).toEqual([["Apartment", "Description of Apartment."]]);
    });
    test("converts several nested objects inside an array into nested arrays", () => {
      const testObjData = [
        {
          property_type: "Apartment",
          description: "Description of Apartment.",
        },
        {
          property_type: "House",
          description: "Description of House.",
        },
        {
          property_type: "Studio",
          description: "Description of Studio.",
        },
      ];

      const testDataArr = convertObjToArr(testObjData);

      expect(testDataArr).toEqual([
        ["Apartment", "Description of Apartment."],
        ["House", "Description of House."],
        ["Studio", "Description of Studio."],
      ]);
    });
    test("shouldn't mutate the original data", () => {
      const testObjData = [
        {
          property_type: "Apartment",
          description: "Description of Apartment.",
        },
        {
          property_type: "House",
          description: "Description of House.",
        },
        {
          property_type: "Studio",
          description: "Description of Studio.",
        },
      ];

      const duplicatedTestObjData = [...testObjData];
      const testDataArr = convertObjToArr(testObjData);

      expect(testObjData).not.toEqual(testDataArr);
      expect(duplicatedTestObjData).toEqual(testObjData);
    });
  });
});
